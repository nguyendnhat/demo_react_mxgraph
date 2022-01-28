/* eslint-disable no-undef */
import "./grapheditor.css";
import { useLayoutEffect, useRef } from "react";
import useLoad from "./useLoad";

function App() {
	const graphContainer = useRef();
	const editorUi = useRef();
	const isMxScriptReady = useLoad();

	const handleClick = (sender, mxEventObj) => {
		console.log(sender, mxEventObj)
	}

	useLayoutEffect(() => {
		if (isMxScriptReady) {
			var editorUiInit = EditorUi.prototype.init;

			EditorUi.prototype.init = function () {
				editorUiInit.apply(this, arguments);
				this.actions.get("export").setEnabled(false);

				// Updates action states which require a backend
				if (!Editor.useLocalStorage) {
					mxUtils.post(
						OPEN_URL,
						"",
						mxUtils.bind(this, function (req) {
							var enabled = req.getStatus() !== 404;
							this.actions.get("open").setEnabled(enabled || Graph.fileSupport);
							this.actions.get("import").setEnabled(enabled || Graph.fileSupport);
							this.actions.get("save").setEnabled(enabled);
							this.actions.get("saveAs").setEnabled(enabled);
							this.actions.get("export").setEnabled(enabled);
						})
					);
				}
			};

			mxResources.loadDefaultBundle = false;
			var bundle =
				mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
				mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

			mxUtils.getAll(
				[bundle, STYLE_PATH + "/default.xml"],
				function (xhr) {
					mxResources.parse(xhr[0].getText());

					var themes = {};
					themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();

					editorUi.current = new EditorUi(
						new Editor(urlParams["chrome"] === "0", themes),
						graphContainer.current
					);

					const editor = editorUi.current.editor;
					const graph = editor.graph

					/**
					 * Event Mapping
					 */
					 graph.addListener(mxEvent.CLICK, function (graph, mxEventObject) {
						handleClick(graph, mxEventObject);
					});

					console.log(editorUi, editorUi.current.editor);
				},
				function () {
					document.body.innerHTML =
						'<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
				}
			);

			console.log(graphContainer, mxEvent);

			return () => {
				editorUi.current.destory();
			};
		}
	}, [isMxScriptReady]);

	return (
		<>
			<div ref={graphContainer}></div>
		</>
	);
}

export default App;
