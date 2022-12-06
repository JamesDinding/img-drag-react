import { upload } from "@testing-library/user-event/dist/upload";
import { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import { ReactDOM } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Backdrop from "../Modal/Backdrop";
import Preview from "../Modal/Preview";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid / 2,
  margin: `0 ${grid}px 0 0`,
  width: "90px",
  flexShrink: "0",
  overflow: "hidden",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  display: "flex",
  padding: grid,
  overflow: "auto",
  height: "300px",
  minHeight: "100px",
  maxHeight: "300px",
});

const UploadList = ({ uploadFiles, onUploadFile, saveFiles, onSaveFiles }) => {
  // upload-section, save-section
  const [pick, setPick] = useState([[], []]);
  const [isPop, setIsPop] = useState(false);
  const [curPreview, setCurPreivew] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewList, setPreviewList] = useState([]);

  function dragEndHandler(result) {
    const { source, destination } = result;

    if (!destination) return;

    // s => 0, d => 1
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    const state = [[...uploadFiles], [...saveFiles]];
    const setState = [onUploadFile, onSaveFiles];

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;

      setState[sInd](newState[sInd]);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState[sInd](newState[sInd]);
      setState[dInd](newState[dInd]);
      // when cross section moving happened reset pick
      setPick([[], []]);
    }
  }

  return (
    <Fragment>
      {isPop &&
        createPortal(
          <Backdrop
            onClose={() => {
              setIsPop(false);
              setCurPreivew(null);
            }}
          />,
          document.getElementById("back-drop")
        )}
      {isPop &&
        createPortal(
          <Preview
            file={curPreview}
            fileList={previewList}
            previewIndex={previewIndex}
            onPreviewIndex={setPreviewIndex}
            onPreview={setCurPreivew}
          />,
          document.getElementById("pop")
        )}
      <div className="w-full overflow-hidden my-4 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <DragDropContext onDragEnd={dragEndHandler}>
            {[uploadFiles, saveFiles].map((el, ind) => (
              <Fragment>
                <Droppable
                  key={ind}
                  droppableId={`${ind}`}
                  direction="horizontal"
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      {el.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div className="flex flex-col gap-1">
                                <button
                                  className={
                                    "text-sm bg-sky-200 text-center " +
                                    (pick[ind].find(
                                      (p, i) => p.path === item.name
                                    )
                                      ? "bg-sky-400"
                                      : "")
                                  }
                                  onClick={() => {
                                    pick[ind].find((p, i) => {
                                      return p.path === item.name;
                                    });
                                    const state = [
                                      [...uploadFiles],
                                      [...saveFiles],
                                    ];
                                    const setState = [
                                      onUploadFile,
                                      onSaveFiles,
                                    ];

                                    setState[ind]((prev) => {
                                      const temp = [...prev];
                                      temp[index].pick = !temp[index].pick;
                                      return temp;
                                    });

                                    setPick((prev) => {
                                      const temp = [...prev];
                                      if (
                                        temp[ind].find(
                                          (p) => p.path === item.name
                                        )
                                      ) {
                                        temp[ind] = temp[ind].filter(
                                          (t) => t.path !== item.name
                                        );
                                        return temp;
                                      }

                                      temp[ind].push(state[ind][index]);
                                      return temp;
                                    });
                                  }}
                                >
                                  {item.name}
                                </button>
                                <button
                                  type="button"
                                  className="text-sm bg-red-300 active:bg-red-500 hover:bg-red-400"
                                  onClick={() => {
                                    const state = [
                                      [...uploadFiles],
                                      [...saveFiles],
                                    ];
                                    const setState = [
                                      onUploadFile,
                                      onSaveFiles,
                                    ];
                                    const newState = [...state];
                                    newState[ind].splice(index, 1);

                                    setState[ind](newState[ind]);
                                  }}
                                >
                                  delete
                                </button>
                                <img
                                  src={item.preview}
                                  className="w-full "
                                  alt=""
                                  onDoubleClick={() => {
                                    setCurPreivew(item);
                                    setPreviewIndex(index);
                                    setPreviewList(
                                      ind == 0 ? uploadFiles : saveFiles
                                    );
                                    setIsPop(true);
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                {ind == 0 && (
                  <div className="flex items-center justify-center">
                    <div className="text-sm flex flex-col gap-1">
                      <button
                        className="active:bg-gray-200 active:text-gray-900 hover:bg-gray-100 border-2 px-2 py-1 rounded-xl"
                        onClick={() => {
                          pick[0].length === uploadFiles.length
                            ? setPick((prev) => [[], prev[1]])
                            : setPick((prev) => [uploadFiles, prev[1]]);
                        }}
                      >
                        全選
                      </button>
                      <button
                        className="active:bg-gray-200 active:text-gray-900 hover:bg-gray-100 border-2 px-2 py-1 rounded-xl"
                        onClick={() => {
                          pick[1].length === saveFiles.length
                            ? setPick((prev) => [prev[0], []])
                            : setPick((prev) => [prev[0], saveFiles]);
                        }}
                      >
                        全選
                      </button>
                    </div>
                    <button
                      className="active:bg-gray-200 active:text-gray-900 hover:bg-gray-100 mx-8 w-10 h-10 border-2 border-solid rounded-full"
                      onClick={() => {
                        onUploadFile((prev) => prev.concat(pick[1]));
                        onSaveFiles((prev) => {
                          let temp = [...prev];
                          pick[1].map((p, i) => {
                            temp = temp.filter((t) => t.name !== p.path);
                          });

                          return temp;
                        });
                        setPick((prev) => [...prev, []]);
                      }}
                    >
                      &uarr;
                    </button>
                    <button
                      className="active:bg-gray-200 active:text-gray-900 hover:bg-gray-100 mx-8 w-10 h-10 border-2 border-solid rounded-full"
                      onClick={() => {
                        onSaveFiles((prev) => prev.concat(pick[0]));
                        onUploadFile((prev) => {
                          let temp = [...prev];
                          pick[0].map((p, i) => {
                            temp = temp.filter((t) => t.name !== p.path);
                          });

                          return temp;
                        });
                        setPick((prev) => [[], ...prev]);
                      }}
                    >
                      &darr;
                    </button>
                  </div>
                )}
              </Fragment>
            ))}
          </DragDropContext>
        </div>
      </div>
    </Fragment>
  );
};

export default UploadList;
