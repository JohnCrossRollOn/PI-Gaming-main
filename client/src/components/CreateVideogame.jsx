import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearForm, postApi, saveForm } from "../global/actions";
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
            genres: [],
            platforms: []
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
            postApi('videogames/create', formState.form).then(
                data=>{
                    setState({...formState, isSubmitted: data.id})
                    dispatch(clearForm())
                }
            ).catch((data)=>{console.log(data)})
           
        }
    }
        
    useEffect(()=>{
        return ()=>dispatch(saveForm(formState))
    }, [formState])
        
    return <div>
        <form onSubmit={submitHandler}>
            
            <input
            name="name"
            type="input"
            value={formState.form.name}
            onChange={controlledChangeHandler}
            placeholder={"Name"}/>
            {formState.errors.name ? <div>{formState.errors.name}</div> : null}

            <input
            name="description"
            type="input"
            value={formState.form.description}
            onChange={controlledChangeHandler}
            placeholder={"Description"}/>
            {formState.errors.description ? <div>{formState.errors.description}</div> : null}

            <hr/>

            <input
            name="launch_date"
            type="date"
            value={formState.form.launch_date}
            onChange={controlledChangeHandler}
            placeholder={"Released"}/>
            {formState.errors.launch_date ? <div>{formState.errors.launch_date}</div> : null}
            
            <input
            name="rating"
            type="number"
            value={formState.form.rating}
            onChange={controlledChangeHandler}
            placeholder="Rating"/>
            <div>{formState.errors.rating}</div>
            
            <hr/>

            <OptionDropdown placeholder="Platforms" name="platforms" options={platforms.map(platform=>platform.name)} onChange={manyOptionsChangeHandler}/>

            {formState.form.platforms.map(platform=>
            <button type="button" key={platform} name="platforms" style={{backgroundColor:"lightgreen"}} value={platform}
            onClick={manyOptionsChangeHandler}>
                {platform} &times;
            </button>)}
            <hr/>
            <OptionDropdown placeholder="Genres" name="genres" options={genres.map(genre=>genre.name)} onChange={manyOptionsChangeHandler}/>
        
            {formState.form.genres.map(genre=>
            <button type="button" key={genre} name="genres" style={{backgroundColor:"lightgreen"}} value={genre}
            onClick={manyOptionsChangeHandler}>
                {genre} &times;
            </button>)}

            <hr/>
            <input
            name="thumbnail"
            type="input"
            value={formState.form.thumbnail}
            onChange={uncontrolledImgHandler}
            placeholder={"Image URL"}/>

            <img src={formState.form.thumbnail} alt="Upload an image."/>

            <hr/>

            <input type="submit" value="Submit"/>
        </form>
        {formState.isSubmitted && <Redirect push to={`/videogame/${formState.isSubmitted}`}/>}
    </div>
};

export default CreateVideogame