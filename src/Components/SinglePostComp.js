import { useState, useEffect } from "react";

export default function SinglePostComp({post})
{
    return (
        <>
        <br/>
        <div style={{ width : "100%", border : "green 1px solid"}}>
            <label>
                Title: {post.title}
            </label>
            <br/><br/>
            <label>
                Body: <span>{post.body}</span>
            </label>
            <br/><br/>
        </div>
        </>
    );
}