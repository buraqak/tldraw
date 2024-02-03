import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  MiniMap,
  Controls,
  updateEdge,
  applyNodeChanges,
  Handle,
  Position,
} from "reactflow";

import "reactflow/dist/style.css";

import { NodeResizer } from "@reactflow/node-resizer";
import "@reactflow/node-resizer/dist/style.css";
import QuillFlow from "./QuillFlow";
import { useState, useCallback, useEffect, useRef } from "react";
import FlowDiagramHelp from "./FlowDiagramHelp";
import Modal from "react-bootstrap/Modal";
const _nodeTypes = {
  nodeComponent: NodeComponent,
};
import { toPng } from "html-to-image";

function NodeComponent({ id, data, isConnectable }) {
  const [text, setText] = useState(data.text);
  const [nodeHeight, setNodeHeight] = useState(data.height);
  const [nodeWidth, setNodeWidth] = useState(data.width);

  const onChange = (evt, value) => {
    if (evt === "text" && typeof value === "string") {
      setText(value);
      data.updateData("text", value);
    }
  };

  function updateHeight(value) {
    setNodeHeight(value.y);
    data.updateData("height", value.y);
  }

  return (
    <>
      {/* <NodeResizer
        color="black"
        stroke="black"
        strokeWidth="10"
        isVisible={data.isSelected}
        onResizeEnd={updateHeight}
        minWidth={"200"}
         minHeight={"100"} 
      /> */}

      <div
        className="text-updater-node"
        style={{
          backgroundColor: data.color,
          border: "1px solid #777",
          padding: "10px",
          height: nodeHeight ? nodeHeight : "auto",
          width: nodeWidth ? nodeWidth : "auto",
          borderRadius: "10px",
        }}
      >
        <Handle
          type="target"
          position="top"
          style={{ background: "#555" }}
          isConnectable={isConnectable}
        />
        <div style={{ minWidth: nodeWidth }}>
          <QuillFlow
            id={id}
            name={"text"}
            value={data.text ? data.text : ""}
            onChange={onChange}
            onBlur={onChange}
            placeholder={` `}
            bgColor={data.color}
            style={{ padding: "50px" }}
          />
        </div>

        <Handle
          type="source"
          position="bottom"
          id="b"
          style={{ background: "#555" }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

function FlowDiagram({
  listOfNodes,
  listOfEdges,
  updateNodeList,
  updateEdgesList,
  isPrint,
}) {
  function getNodeId() {
    return `randomnode_${+Date.now()}`;
  }
  const [isShowHelp, setIsShowHelp] = useState(false);

  const [choosenColor, setChoosenColor] = useState("#90DBF4");
  const [rfInstance, setRfInstance] = useState(null);
  const edgeUpdateSuccessful = useRef(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const onAdd = () => {
    const newNode = {
      id: getNodeId(),
      type: "nodeComponent",
      data: {
        color: "#D4D4D4",
        text: "Type here",
        label: "",
        height: null,
        updateData: updateData,
        addNew: onAdd,
        deleteCurrent: onDelete,
      },
      isConnectable: true,
      isSelected: false,
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    let allNodes = [...nodes, newNode];
    setNodes(allNodes);
  };

  const onDelete = () => {
    let arr = null;
    arr = nodes.filter(function (obj) {
      return obj.id !== selectedNode;
    });
    setNodes(arr /* nds => nds.filter(node => node.id !== id) */);
    setSelectedNode(null);
    setChoosenColor("#90DBF4");
  };

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  var nodesArray = listOfNodes;
  var edgesArray = listOfEdges;
  if (nodesArray.length < 1) {
    nodesArray = [
      {
        id: getNodeId() + 1,
        position: { x: 500, y: 50 },
        type: "nodeComponent",
        data: {
          color: "#00FF88",
          text: "+",
          label: "1",
          updateData: updateData,
          addNew: onAdd,
          height: null,
          deleteCurrent: onDelete,
          isSelected: false,
        },
      },
      {
        id: getNodeId() + 2,
        position: { x: 700, y: 200 },
        type: "nodeComponent",
        data: {
          color: "#8EECF5",
          text: "-",
          label: "2",
          height: null,
          updateData: updateData,
          addNew: onAdd,
          deleteCurrent: onDelete,
          isSelected: false,
        },
      },
      {
        id: getNodeId() + 3,
        position: { x: 300, y: 200 },
        type: "nodeComponent",
        data: {
          color: "#FDE4CF",
          text: "-",
          label: "3",
          height: null,
          updateData: updateData,
          addNew: onAdd,
          deleteCurrent: onDelete,
          isSelected: false,
        },
      },
      {
        id: getNodeId() + 4,
        position: { x: 500, y: 300 },
        type: "nodeComponent",
        data: {
          color: "#F9F458",
          text: ` + `,
          label: "4",
          height: null,
          updateData: updateData,
          addNew: onAdd,
          deleteCurrent: onDelete,
          isSelected: false,
        },
      },
    ];
  } else {
    nodesArray.map((item) => {
      return (item.data = {
        ...item.data,
        updateData: updateData,
        addNew: onAdd,
        deleteCurrent: onDelete,
      });
    });
  }

  if (edgesArray.length < 1) {
    edgesArray = [];
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesArray);
  const [edges, setEdges, onEdgesChange] = useEdgesState(listOfEdges);

  function updateData(key, value) {
    console.log(key, value);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== selectedNode) {
          return node;
        }
        return {
          ...node,
          data: {
            ...node.data,
            [key]: value,
            isSelected: true,
          },
        };
      })
    );
  }

  function updateSelection(selectedKey) {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== selectedKey) {
          return {
            ...node,
            data: {
              ...node.data,
              isSelected: false,
            },
          };
        }
        return {
          ...node,
          data: {
            ...node.data,
            isSelected: true,
          },
        };
      })
    );
  }

  useEffect(() => {
    if (nodes.length) updateNodeList("nodes", nodes);
    else onAdd();
  }, [nodes]);

  useEffect(() => {
    updateEdgesList("edges", edges);
  }, [edges]);

  const proOptions = { hideAttribution: true };

  const onConnect = useCallback(
    (params) => {
      (params.markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "black",
      }),
        (params.style = {
          strokeWidth: 0.7,
          stroke: "black",
        }),
        (params.type = "smoothstep"),
        setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onChange = (evt) => {
    if (evt.target.name === "Color") {
      updateData("color", evt.target.value);
      setChoosenColor(evt.target.value);
    }
  };

  function getNodeData(event, node) {
    setSelectedNode(node.id);
    updateSelection(node.id);
    setChoosenColor(node.data.color);
  }
  var _height = "90vh";
  var _width = "100%";

  function Loaded() {
    if (isPrint) {
      toPng(document.querySelector(".react-flow"), {
        filter: (node) => {
          // we don't want to add the minimap and the controls to the image
          if (
            node?.classList?.contains("react-flow__minimap") ||
            node?.classList?.contains("react-flow__controls")
          ) {
            return false;
          }

          return true;
        },
      }).then((output) => {
        sessionStorage.setItem("FlowChart", output);
      });

      /*  html2canvas(document.querySelector(".react-flow")).then(canvas => {
                 var htmlData = canvas.toDataURL();
                 sessionStorage.setItem("FlowChart", htmlData)
             }); */
    }
  }

  return (
    <div style={{ height: _height, width: _width }} className="">
      <div className="row mx-0 border-bottom grey-section py-0 position-relative">
        <div className="col-12 d-flex justify-content-center mx-auto ">
          <div className="row">
            <div className="d-flex justify-content-center col-12  col-lg-12  px-0 py-3 ">
              <img
                src="./img/CanvasInfo/help_icon_1.png"
                className="cursor-pointer canvas-help-icon help_icon_35 flow-chart-icon position-absolute"
                title={"Help"}
                onClick={() => setIsShowHelp(true)}
              />

              <div className="color-button me-3" tabIndex={-1}>
                <div className="flow-chart-color" tabIndex={-1}>
                  <input
                    type="color"
                    value={choosenColor}
                    name="Color"
                    list="presetColors"
                    onChange={(e) => onChange(e)}
                    id="style3"
                    tabIndex={-1}
                  />
                  <datalist id="presetColors">
                    <option>#FF5CA3</option>
                    <option>#FF5CE9</option>
                    <option>#FF47D7</option>
                    <option>#DA5FFC</option>
                    <option>#D270FF</option>
                    <option>#B67CFE</option>
                    <option>#7E8CFC</option>
                    <option>#619BFF</option>
                    <option>#3EA4D0</option>
                    <option>#67ADAB</option>
                    <option>#8BC34A</option>
                    <option>#90BE6D</option>
                    <option>#82A867</option>
                    <option>#00FF88</option>
                    <option>#04FF00</option>
                    <option>#AEFF00</option>
                    <option>#FE692A</option>
                    <option>#FF6666</option>
                    <option>#A1A1A1</option>
                    <option>#57FFF4</option>
                    <option>#57FFB0</option>
                    <option>#F9F458</option>
                    <option>#EFBB01</option>
                    <option>#EEFF00</option>
                    <option>#FFEA00</option>
                    <option>#FFAD00</option>
                    <option>#B9FBC0</option>
                    <option>#98F5E1</option>
                    <option>#8EECF5</option>
                    <option>#90DBF4</option>
                    <option>#A3C4F3</option>
                    <option>#CFBAF0</option>
                    <option>#F1C0E8</option>
                    <option>#FFCFD2</option>
                    <option>#FDE4CF</option>
                    <option>#FBF8CC</option>
                    <option>#D4D4D4</option>
                    <option>#FFFFFF</option>
                  </datalist>
                  <label htmlFor="style3">Color</label>
                </div>
              </div>
              <div
                className="variation-add flow_add_button me-3"
                onClick={onAdd}
              >
                <button type="button" tabIndex={-1}>
                  Add
                </button>
              </div>
              <div
                className={
                  selectedNode
                    ? "variation-remove flow_delete_button"
                    : "variation-remove flow_delete_button disabled"
                }
                onClick={selectedNode ? onDelete : null}
              >
                <button type="button" tabIndex={-1}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={Loaded}
        fitView={true}
        onEdgeUpdate={onEdgeUpdate}
        onNodeClick={getNodeData}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        maxZoom={1}
        nodeTypes={_nodeTypes}
        proOptions={proOptions}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
      {isShowHelp ? (
        <FlowDiagramHelp
          closePopUp={() => setIsShowHelp(false)}
          thingsToShow={{
            pen: true,
            line: false,
            pan: false,
            zoom: false,
            opacity: false,
            circle: false,
            fitToScreen: false,
          }}
        />
      ) : null}
    </div>
  );
}

export default FlowDiagram;

const foreignObjectSize = 40;

const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};
