import React from "react";

const Add = ()=>  <form className="form" onSubmit={submitHandler}>
    <div className="form_content">
        <div className="form_title">
            <input
            name="name"
            type="input"
            value={formState.form.name}
            onChange={controlledChangeHandler}
            placeholder={"Name"}/>
            {formState.errors.name ? <div>{formState.errors.name}</div> : null}
        </div>
        <div className="form_paragraph">
            <p style={{fontStyle: "italic", fontWeight: "bolder"}}>
                <OptionDropdown placeholder="Genres" name="genres" options={genres.map(genre=>genre.name)} onChange={manyOptionsChangeHandler}/>

                {formState.form.genres.map(genre=>
                <button type="button" key={genre} name="genres" value={genre}
                onClick={manyOptionsChangeHandler}>
                {genre} &times;
                </button>)}
            </p>
            <br/>
                <input
                name="description"
                type="input"
                value={formState.form.description}
                onChange={controlledChangeHandler}
                placeholder={"Description"}/>
                {formState.errors.description ? <div>{formState.errors.description}</div> : null}
            <br/>
            <p style={{fontSize: "1.5rem"}}>
                {['☆','☆','☆','☆','☆'].fill('★', 0, Math.floor(formState.form.rating)).join('')+' '+`[${
                    <>
                        <input
                        name="rating"
                        type="number"
                        value={formState.form.rating}
                        onChange={controlledChangeHandler}
                        placeholder="Rating"/>
                        <div>{formState.errors.rating}</div>
                    </>
                }]`}</p>
        </div>
    </div>
    <div className="form_card">
        <img src={formState.form.thumbnail} alt="Upload an image."/>
        <input
        name="thumbnail"
        type="input"
        value={formState.form.thumbnail}
        onChange={uncontrolledImgHandler}
        placeholder={"Image URL"}/>
        <p>
            <input
            name="launch_date"
            type="date"
            value={formState.form.launch_date}
            onChange={controlledChangeHandler}
            placeholder={"Released"}/>
            {formState.errors.launch_date ? <div>{formState.errors.launch_date}</div> : null}
        </p>
        <OptionDropdown placeholder="Platforms" name="platforms" options={platforms.map(platform=>platform.name)} onChange={manyOptionsChangeHandler}/>
        <ul>
            {formState.form.platforms.map(platform=>
            <li><button type="button" key={platform} name="platforms" value={platform}
            onClick={manyOptionsChangeHandler}>
                {platform} &times;
            </button></li>)}
        </ul>
        <input type="submit" value="Submit"/>
    </div>
    {formState.isSubmitted && <Redirect push to={`/videogame/${formState.isSubmitted}`}/>}
</form>