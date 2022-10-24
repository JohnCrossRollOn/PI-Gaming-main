import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearForm, postApi, saveForm, getGames} from "../global/actions";
import OptionDropdown from "./OptionDropdown";

const CreateVideogame = ()=>{
    const dispatch = useDispatch();
    const { genres, platforms} = useSelector(state=>state);
    const saved = useSelector(state=>state.formState);
    
    const [formState, setState] = useState(saved!==''?saved:{
        form:{
            name: '',
            description: '',
            launch_date: '',
            rating: '',
            thumbnail: '',
            genres: [''],
            platforms: ['']
        },
        errors: {
            name: '',
            description:'',
            launch_date:'',
            rating: ''
        },
        allowSubmit: true,
        isSubmitted: false
    });
    
    const check = {
        name: (value)=>value.length===0?'You have a name. I have a name. Everything has a name.'
        :value.length<3?
        'Can\'t be less than 3':'',
        description: (value)=>value.length===0?'Get creative.'
        :value.length <25?`Need at least ${25-value.length} characters more.`:'',
        launch_date: (value)=>{
            const today = new Date();
            const inputDate = new Date(value)
            return value.length===0?'At least a year.':inputDate > today ?'Unless you have a time machine, that date is unavailable at this moment.':'';
        },
        rating: (value)=>value.length===0?'Everyone has an opinion.':value>5||value<0?'You can only rate between 0 & 5.':''
    }
    
    const controlledChangeHandler = (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        
        setState({
            ...formState,
            form: {
                ...formState.form,
                [name]: value
            },
            errors: {
                ...formState.errors,
                [name]: check[name](value)
            },
            allowSubmit: Object.keys(formState.errors).every(error=>error==='')
        })
    }

    const manyOptionsChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setState({
            ...formState,
            form: {
                ...formState.form,
                [name]: formState.form[name].some(input=>input===value)?
                [...formState.form[name].filter(values=>values!==value)]:[value, ...formState.form[name]]
            }
        })
    }
    
    const uncontrolledImgHandler = (e) =>{
        e.preventDefault()
        
        setState({
            ...formState,
            form: {
                ...formState.form,
                thumbnail: e.target.value
            }
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        let errors = formState.errors;
        Object.keys(formState.errors).forEach(key=>{errors[key]=check[key](formState.form[key])});

        setState({
            ...formState,
            errors
        })
        if (Object.values(formState.errors).every(error=>error==='')) {
            dispatch(getGames());
            postApi('videogames/create', formState.form).then(
                data=>{
                    setState({...formState, isSubmitted: data.id})
                }
            )
        }
    }
        
    useEffect(()=>{
        return ()=>dispatch(formState.isSubmitted?clearForm():saveForm(formState))
    }, [formState])
        
    return <div>
        <form className="create form drop" onSubmit={submitHandler}>
        <div className="form_content">
            <div className="create_title">    
            {formState.form.launch_date!=='' && <span>{formState.form.launch_date.split('-')[0]+', '}</span>}
            <input
            autoComplete="none"
            className=""
            name="name"
            type="input"
            value={formState.form.name}
            onChange={controlledChangeHandler}
            placeholder={"Name"}/>
            </div>
            {formState.errors.name ? <div  className="nothing_container shake">{formState.errors.name}</div> : null}
        <div className="form_paragraph">
            <div style={{fontStyle: "italic", fontWeight: "bolder"}}>
                <OptionDropdown className="filter_genre create_select" placeholder="Genres" name="genres" options={genres.map(genre=>genre.name)} onChange={manyOptionsChangeHandler}/>

                {formState.form.genres.map(genre=>genre!==''?
                <button className="tags"
                type="button" key={genre} name="genres" value={genre}
                onClick={manyOptionsChangeHandler}>
                {genre} &times;
                </button>:null)}
            </div>
            <div>
                <textarea
                className="create_description"
                autoComplete="none"
                name="description"
                type="input"
                value={formState.form.description}
                onChange={controlledChangeHandler}
                placeholder={"Description"}/>
                {formState.errors.description ? <div  className="nothing_container shake">{formState.errors.description}</div> : null}
            </div>
            <br/>
            <div style={{fontSize: "1.5rem"}} className="create_rating_container">
                {['☆','☆','☆','☆','☆'].fill('★', 0, Math.floor(formState.form.rating)).join('')+' '}
                [<input
                className="create_rating"
                autoComplete="none"
                name="rating"
                type="number"
                value={formState.form.rating}
                onChange={controlledChangeHandler}
                placeholder="Rating"/>]
                {formState.errors.rating ? <div className="nothing_container shake">{formState.errors.rating}</div> : null}
            </div>
        </div>
    </div>
    <div className="form_card">
        <img className="create_img" src={formState.form.thumbnail} alt="Upload an image."/>
        <input
        name="thumbnail"
        type="input"
        value={formState.form.thumbnail}
        onChange={uncontrolledImgHandler}
        placeholder={"Image URL"}/>
        <div>
            <input
            autoComplete="none"
            name="launch_date"
            type="date"
            value={formState.form.launch_date}
            onChange={controlledChangeHandler}
            placeholder={"Released"}/>
            {formState.errors.launch_date ? <div  className="nothing_container shake">{formState.errors.launch_date}</div> : null}
        </div>
        <OptionDropdown className="filter_genre" placeholder="Platforms" name="platforms" options={platforms.map(platform=>platform.name)} onChange={manyOptionsChangeHandler}/>
            {formState.form.platforms.map(platform=>platform!==''?
            <button type="button" className="tags" key={platform} name="platforms" value={platform}
            onClick={manyOptionsChangeHandler}>
                {platform} &times;
            </button>:null)}
        <input className="submit_button home-button " type="submit" value="Submit"/>
    </div>
</form>
        {formState.isSubmitted && <Redirect push to={`/videogame/${formState.isSubmitted}`}/>}
    </div>
};

export default CreateVideogame