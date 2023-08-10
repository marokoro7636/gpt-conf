import React from 'react';

function PostForm() {
    return (
        <div>
            <form>
                サーバ名
                <input type="text"/><br/>
                ソフトウェア名
                <input type="text"/><br/>
                設定したい内容(箇条書きで)<br/>
                <textarea name="content" rows={10} cols={40}/>
            </form>
        </div>
    );
}

export default PostForm;