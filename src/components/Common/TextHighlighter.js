import React, {
  useState,
  useMemo,
  useContext,
  lazy,
  Suspense,
  useEffect,
} from "react";
const ReactQuill = lazy(() => import("react-quill"));
import { Quill } from "react-quill";

let Inline = Quill.import("blots/inline");
class CircleBlot extends Inline {
  static blotName = "circle";
  static tagName = "SPAN";
  static className = "ql-custom-circle-sketch-highlight";
  static formats() {
    return true;
  }
}

class CommentBlot extends Inline {
  static create(value) {
    let node = super.create(value);
    if (typeof value === "string") node.setAttribute(`title`, value);
    else if (typeof value === "object") {
      node.setAttribute(`title`, value.title);
    }
    return node;
  }
  static formats(node) {
    // We still need to report unregistered embed formats
    let format = {};
    if (node.hasAttribute("title")) {
      format.title = node.getAttribute("title");
    }
    return format;
  }
  static value(node) {
    return node.getAttribute("title");
  }

  /* format(name, value) {
    console.log(name, value);
    // Handle unregistered embed formats
    if (name === 'title') {
      if (value) {
        this.domNode.setAttribute(name, value);
      }
    } else {
      super.format(name, "undefined");
    }
  } */
}
CommentBlot.blotName = "comment";
CommentBlot.tagName = "code";
CommentBlot.className = "pdf-print-color";

Quill.register(CommentBlot);
Quill.register("formats/circle", CircleBlot);
export const TextHighlighter = React.memo(
  ({ id, name, value, onChange, onBlur, placeholder, stop }) => {
    const quillRef = React.useRef();
    var tabHideEls = document.querySelectorAll(".ql-toolbar .ql-picker-label");
    tabHideEls.forEach(function (item) {
      item.setAttribute("tabindex", -1);
    });

    const CustomUndo = () => (
      <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
          className="ql-stroke"
          d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
      </svg>
    );

    var maxLength = 1502;

    const handleChange = (val, delta, source, editor) => {
      if (source != "api") onChange(name, val);
    };

    const handleBlur = () => {
      onBlur(name, true);
    };

    var toolbarOptions = {
      container: [
        "bold",
        "italic",
        "underline",
        {
          color: [
            "#FE692A",
            "#AD001A",
            "#A21A70",
            "#8000A3",
            "#5C01CB",
            "#30019D",
            "#3030B5",
            "#0000FF",
            "#004F99",
            "#06605E",

            "#FFAD00",
            "#665000",
            "#8F4000",
            "#DA5FFC",
          ],
        },
        {
          background: [
            "#FF5CA3",
            "#FF5CE9",
            "#FF47D7",
            "#DA5FFC",
            "#D270FF",
            "#B67CFE",
            "#7E8CFC",
            "#619BFF",
            "#3EA4D0",
            "#67ADAB",
            "#8BC34A",
            "#90BE6D",
            "#82A867",
            "#00FF88",
            "#04FF00",
            "#AEFF00",
            "#FE692A",
            "#FF6666",
            "#A1A1A1",
            "#57FFF4",
            "#57FFB0",
            "#F9F458",
            "#EFBB01",
            "#EEFF00",
            "#FFEA00",
            "#FFAD00",
            "#B9FBC0",
            "#98F5E1",
            "#8EECF5",
            "#90DBF4",
            "#A3C4F3",
            "#CFBAF0",
            "#F1C0E8",
            "#FFCFD2",
            "#FDE4CF",
            "#FBF8CC",
            "#D4D4D4",
            "#FFFFFF",
          ],
        },
        "clean",
        "circle",
        "comment",
      ],
      handlers: {
        // handlers object will be merged with default handlers object
        comment: function (value) {
          let range = this.quill.getSelection();
          if (range && value) {
            let text = prompt("Enter your comment:");
            this.quill.formatText(
              range.index,
              range.length,
              "comment",
              text,
              "user"
            );
          } else if (!value) {
            var selectedText = this.quill.getFormat(range.index, range.length);
            let text = prompt(
              "Update your comment:",
              selectedText.comment.title
            );
            this.quill.formatText(
              range.index,
              range.length,
              "comment",
              text,
              "user"
            );
          }
        },
      },
    };

    var modules = useMemo(() => {
      return {
        toolbar: toolbarOptions,
        keyboard: {
          bindings: {
            tab: false,
            enter: {
              key: 13,
              /* handler: function (e) { e.preventDefault(); } */
            },
            delete: {
              key: 46,
              /* handler: function (e) { e.preventDefault(); } */
            },
            backspace: {
              key: 8,
              /* handler: function (e) { e.preventDefault(); } */
            },
          },
        },
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true,
        },
      };
    }, [id]);

    var formats = [
      "bold",
      "italic",
      "underline",
      "color",
      "background",
      "clean",
      "circle",
      "comment",
      "align",
    ];

    return (
      <Suspense callback={"Loading..."}>
        <div
          className="text-editor"
          onDrop={(e) => e.preventDefault()}
          onContextMenu={(event) => event.preventDefault()}
        >
          {stop ? (
            <p dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <ReactQuill
              key={id}
              formats={formats}
              tabIndex={-1}
              placeholder={
                placeholder ? placeholder : "<Record your response here>"
              }
              contentEditable={false}
              className="text-highlighter"
              preserveWhitespace={true}
              ref={quillRef}
              theme="bubble"
              defaultValue={value}
              onChange={(e, delta, source, editor) => {
                handleChange(e, delta, source, editor);
              }}
              onBlur={handleBlur}
              spellCheck={false}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              onKeyPress={(e) => {
                e.preventDefault();
              }}
              modules={modules}
            />
          )}
        </div>
      </Suspense>
    );
  }
);
export default TextHighlighter;
