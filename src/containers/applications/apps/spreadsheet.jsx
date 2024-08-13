import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToolBar } from "../../../utils/general";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css"

import createEngine, { DiagramModel, DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from '../../helpers/DemoCanvasWidget';
import { DemoButton, DemoWorkspaceWidget } from '../../helpers/DemoWorkspaceWidget';


export const Spreadsheet = () => {
  const wnapp = useSelector((state) => state.combined.application.spreadsheet);
  const content = useSelector((state) => state.combined.application.spreadsheet.content) ?? "";
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  // useEffect(() => {
  //   if (!excalidrawAPI) {
  //     return;
  //   }
  //   // to open the library sidebar
  //   excalidrawAPI.refresh();
  // }, [excalidrawAPI]);
  const [color, setColor] = useState("#222222");
  const [radii, setRadii] = useState(4);
  const [eraze, setErz] = useState(false);
  const [reset, setRst] = useState(false);
  const [tools, setTools] = useState([
    "#222222",
    "#e92a2a",
    "#2a52e9",
    "#12c629",
    "#e9a21e",
    "#911ee9",
    "erazer",
    "reset",
  ]);

  // //1) setup the diagram engine
	// var engine = createEngine();

	// //2) setup the diagram model
	// var model = new DiagramModel();

	// //3-A) create a default node
	// var node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
	// var port1 = node1.addOutPort('Out');
	// node1.setPosition(100, 100);

	// //3-B) create another default node
	// var node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
	// var port2 = node2.addInPort('In');
	// node2.setPosition(400, 100);

	// //3-C) link the 2 nodes together
	// var link1 = port1.link(port2);

	// //4) add the models to the root graph
	// model.addAll(node1, node2, link1);

	// //5) load model into engine
	// engine.setModel(model);

  
  return (
    <div
      className="spreadsheet floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size === "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Spreadsheet"
        bg="#f9f9f9"
        noinvert
      />
        <Workbook data={[{ name: "Sheet1" }]} />
        {/* <CanvasDragToggle engine={engine} model={model} /> */}
    </div>
  );
};

const CanvasDragToggle = ({engine, model}) => {
  const enableDrag = () => {
		const state = engine.getStateMachine().getCurrentState();
		state.dragCanvas.config.allowDrag = true;
	};

	const disableDrag = () => {
		const state = engine.getStateMachine().getCurrentState();
		state.dragCanvas.config.allowDrag = false;
	};

  return (
    <DemoWorkspaceWidget
      buttons={[
        <DemoButton key={1} onClick={enableDrag}>
          Enable canvas drag
        </DemoButton>,
        <DemoButton key={2} onClick={disableDrag}>
          Disable canvas drag
        </DemoButton>
      ]}
    >
      <DemoCanvasWidget>
        <CanvasWidget engine={engine} />
      </DemoCanvasWidget>
    </DemoWorkspaceWidget>
  );
}