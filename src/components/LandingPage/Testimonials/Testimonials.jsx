import React, {useState, useEffect} from 'react'
import './Testimonials.styles.scss'
import Testimonial1 from '../../../assets/testimonial-1.png'
import Testimonial2 from '../../../assets/testimonial-2.png'
import Testimonial3 from '../../../assets/testimonial-3.png'
import Testimonial4 from '../../../assets/testimonial-4.png'
import Testimonial5 from '../../../assets/testimonial-5.png'
import Testimonial6 from '../../../assets/testimonial-6.png'
import { useRef } from 'react'
const Testimonial = ({text,from,title, img})=>{


    return (
        <div className='testimonials__contents-item'>
            <div className='testimonials__contents-item-commas'>“</div>
            <div className='testimonials__contents-item-text'>{text}</div>
            <div className='testimonials__contents-item-by'>
            <div className="testimonials__contents-item-img" style={{background : `url(${img}) center center/cover`}}></div>
            <div className='testimonials__contents-item-texts'>
            <div className='testimonials__contents-item-from'>{from}</div>
            <div className='testimonials__contents-item-desig'>{title}</div>
            </div>
            </div>
        </div>
    )
}
const TestimonialPagenation = ({page,setPage,id})=>{
    return (
    <>
    <div onClick={()=>setPage(id)} className={`testimonials__controller-item${page===id?' testimonials__controller-item-active':''}`}></div>
    </>
);
}

const testimonailsArray = [{ 
    text:"  I LIKE that Surf Eye is always recording, EVEN IN THE EARLY MORNING SESSIONS.”", img : Testimonial1, from :"GONZALO" ,title : "LEVEL: ADVANCED",
}, {
    text:"IT’S GREAT BECAUSE I CAN DECIDE AFTER MY SESSION IF I WANT TO BUY the video OR NOT.”", from :"PEDRO" , img : Testimonial2 ,title : "LEVEL: INTERMEDIATE",
   
},
{
    text:"IT WORKS LIKE MAGIC. VIDEOS ARE ALWAYS CENTERED AND SUPER ACCURATE.”", from :"DIOGO" , img : Testimonial3, title : "LEVEL: BEGINNER/INTERMEDIATE",
   
},
{
    text:"I HAVE THE BEST WAVE OF MY LIFE ON VIDEO THANKS TO SURF EYE!”", from :"JOANA" , img : Testimonial6, title : "LEVEL: INTERMEDIATE",
   
},
{
    text:"SURF EYE IS A GAME CHANGER, NO MATTER YOUR LEVEL.”", from :"FILIPPO" , img : Testimonial5, title : "LEVEL: ADVANCED",
   
},
{
    text:"Videos help me understand my mistakes and improve faster.”", from :"JOÃO" , img : Testimonial4, title : "LEVEL: BEGINNER/INTERMEDIATE",
   
},

] 

function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  



const Testimonials = () => {
    const [page,setPage] = useState(1);
    const [height,setHeight] = useState('fit-content');
    const ref = useRef();
    useEffect(()=>{
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }
    }, [])

    const pageInfo = {
        eachPage : 3,
        totalPages : Math.ceil(testimonailsArray.length/3)
    }
    const [activeTestimonials,setActiveTestimonials] = useState(paginate(testimonailsArray,pageInfo.eachPage,page));
    useEffect(()=>{
        setActiveTestimonials(paginate(testimonailsArray,3,page));

    }, [page])
    const paginationItems = [];
    for(let i=1; i<=pageInfo.totalPages; ++i) {
        paginationItems.push(<TestimonialPagenation id={i} page={page} setPage={setPage}/>)
    }
  return (
    <div className='testimonials'>
        <div className='container testimonials-container'>
            <div className="testimonials__heading">Testimonials</div>
            <div className='testimonials__contents' ref={ref} style={{height}}>
            {activeTestimonials.map((a,idx)=><Testimonial id={idx} key={idx} text={a.text} img={a.img} from = {a.from} title={a.title}/>)}
            </div>
        </div>
        <div className='testimonials__controller'>
            {/* {testimonailsArray.slice(0,testimonailsArray.length/3).map((t,idx)=>())} */}
          {paginationItems}
        </div>
    </div>
  )
}

export default Testimonials