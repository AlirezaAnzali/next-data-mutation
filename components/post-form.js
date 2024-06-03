"use client";

import FormSubmit from "@/components/form-submit";
import { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [errors, setErrors] = useState({});

  function validateForm(formData) {
    const newErrors = {};
    const title = formData.get("title");
    const image = formData.get("image");
    const content = formData.get("content");

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      newErrors.title = "Title is required";
    }

    if (
      !content ||
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      newErrors.content = "Content is required";
    }

    if (!image || image.size === 0) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return false;
    }

    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (validateForm(formData)) {
      onSubmit(formData);
    }
  }

  return (
    <>
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
          {errors.image && <p className="form-error">{errors.image}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
          {errors.content && <p className="form-error">{errors.content}</p>}
        </div>
        <div className="form-actions">
          <FormSubmit />
        </div>
      </form>
    </>
  );
}
