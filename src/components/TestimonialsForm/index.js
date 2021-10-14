import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useState } from "react";

function TestimonialsForm({ testimonial }) {
  const [name, setName] = useState(testimonial?.name || "");
  const [image, setImage] = useState(testimonial?.image || "");
  const [content, setContent] = useState(testimonial?.content || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="container"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      {image && (
        <img
          height="150px"
          src={image.size ? URL.createObjectURL(image) : image}
          alt={image}
        />
      )}
      <div className="mb-3">
        <label className="form-label" htmlFor="customFile">
          Imagen
        </label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setImage(e.target.files[0])}
          id="customFile"
        />
      </div> 

      <div className="form-group ">
        <label>Nombre</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de testimonio"
          defaultValue={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Contenido</label>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            setContent(editor.getData());
          }}
        />
      </div>
      {!testimonial ? (
        <button type="submit" className="btn btn-primary mt-3">
          Enviar
        </button>
      ) : (
        <>
          <button type="submit" className="btn btn-primary mt-3 me-2">
            Confirmar
          </button>
          <button className="btn btn-danger mt-3">Cancelar</button>
        </>
      )}
    </form>
  );
}

export default TestimonialsForm;
