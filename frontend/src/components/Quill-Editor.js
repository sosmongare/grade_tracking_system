import React from "react"
import clsx from "clsx"
import ReactQuill from "react-quill"


const QuillEditor = ({ className, ...rest }) => {

  return <ReactQuill className={clsx("", className)} {...rest} />
}



export default QuillEditor
