import React, { Component } from 'react';
import { Button } from 'reactstrap';

const Page = ({page, onEdit, showEdit}) => {

    if (! page) {
        return (<div>Not found</div>)
    }

    return(
        <div>
            <h2>{page.name}</h2>
            <p>{page.content}</p>
            {showEdit ? <Button onClick={onEdit}>Edit page</Button> : ''}
        </div>
    )
}

export default Page;
