import React from "react";
import Post_pc from "../components/post_pc";
import Post_mobile from "../components/post_mobile";


function Post() {

    let post_section;

    if(window.innerWidth < 992){
        post_section = <Post_mobile />
    }else{
        post_section = <Post_pc />
    }

    return (
        <main id="main_post" className="container-fluid container-xl d-flex align-items-center justify-content-center">
            {post_section}
        </main>
    )

}

export default Post