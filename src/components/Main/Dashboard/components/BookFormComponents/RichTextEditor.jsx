import React from "react";
import ReactDOM from "react-dom";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";

// Import all Froala Editor plugins;
import "froala-editor/js/plugins.pkgd.min.js";

// Import a language file.
import "froala-editor/js/languages/fr.js";

// Include font-awesome css if required.
import "font-awesome/css/font-awesome.css";
import "froala-editor/js/third_party/font_awesome.min.js";

const RichTextEditor = ({ handleModelChange, model, title }) => {
  return (
    <FroalaEditorComponent
      config={{
        placeholderText: title,
      }}
      model={model}
      tag="textarea"
      onModelChange={handleModelChange}
    />
  );
};

export default RichTextEditor;
