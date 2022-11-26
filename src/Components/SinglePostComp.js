import { useState, useEffect } from "react";

export default function SinglePostComp({post})
{
    return (
        <div className="card card-single-post">
            <label>
                <strong>Title: </strong>{post.title}
            </label>
            <br/><br/>
            <label>
                <strong>Body: </strong><span>{post.body}</span>
            </label>
        </div>
    );
}