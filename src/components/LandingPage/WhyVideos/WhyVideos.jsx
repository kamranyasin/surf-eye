import React from 'react'
import Vector1 from '../../../assets/whyvideos/vector-1.svg'
import Vector2 from '../../../assets/whyvideos/vector-2.svg'
import Vector3 from '../../../assets/whyvideos/vector-3.svg'
import './WhyVideos.styles.scss'
import {BsFillPlayFill} from 'react-icons/bs';
import WhyVideosBackground from '../../../assets/whyvideos.png';


const Item = ({img,title})=>{
    return (
        <div className='videos__contents-item'>
            <div className='videos__contents-item-img'>
                <img src={img} alt={title}/>
            </div>
            <div className='videos__contents-item-title'>{title}</div>
        </div>
    )
}

const WhyVideos = () => {
  return (
    <div className='videos' style={{background : `url(${WhyVideosBackground}) 7% center/cover`}}>
        <div className='container videos-container'>
            <div className='videos__heading heading-all'>Why videos?</div>
            <div className='videos__contents'>
                <Item img={Vector1} title="CREATE LIFETIME MEMORIES"/>
                <div className='seen-in-phone'>
                <Item img={Vector3} title="SHARE WITH FRIENDS"/>
                </div>
                <div className='hidden-in-phone'>
                <Item img={Vector2} title="WATCH YOURSELF AND IMPROVE"/>
                </div>
                
                <div className='hidden-in-phone'>
                <Item img={Vector3} title="SHARE WITH FRIENDS"/>
             
                </div>
            </div>
            <div className='seen-in-phone improve-3'>
                <Item img={Vector2} title="WATCH YOURSELF AND IMPROVE"/>
            </div>
            <div className='videos__title'>TRAIN LIKE A PRO WITH SURF EYE</div>
            <div style={{cursor : 'pointer'}} onClick={()=>window.scrollTo(0,0)} className="videos__button"><span>WATCH YOUR SESSIONS NOW</span><BsFillPlayFill/></div>
        </div>
    </div>
  )
}

export default WhyVideos