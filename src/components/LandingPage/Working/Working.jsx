import React from "react";
import "./Working.styles.scss";
import DownloadSVG from "../../../assets/working/download.svg";
import PaySVG from "../../../assets/working/pay.svg";
import SelectVideosSVG from "../../../assets/working/selectVideos.svg";
import SurfSVG from "../../../assets/working/surf.svg";
import FaqSVG from "../../../assets/faq.svg";
import { BsFillPlayFill } from "react-icons/bs";
import DialogButton from "../../PopOver/Dialog";

const Item = ({ img, title, desc }) => {
  return (
    <div className="working__contents__item">
      <div className="working__contents__item-img">
        <img src={img} alt="" />
      </div>
      <div className="working__contents__item-title">{title}</div>
      <div className="working__contents__item-desc">{desc}</div>
    </div>
  );
};

const FAQQuestion = ({ title, answer }) => {
  return (
    <div className="working__action__faq__content__question">
      <div className="working__action__faq__content__question-heading">
        {title}
      </div>
      <div className="working__action__faq__content__question-answer">
        {answer}
      </div>
    </div>
  );
};

const FAQANS1 = ()=>{
  return (
    <div>
      <ol>
        <li>Check the location of our active cameras and their recording area. If the main break moves, don’t worry, Surf Eye cameras will adjust. </li>
        <li>Keep in mind the starting time of your session. It will make it easier to find your videos.</li>
      </ol>
      <p>That{"'"}s it! </p>
      <p>Shred and have fun. Surf Eye cameras will record every wave.</p>
    </div>
  )
}
const FAQANS2 = ()=>{
  return (
    <div>
      <ol>
        <li>Visit our website and select the location and starting time of your session. </li>
        <li>Sign up or login.</li>
        <li>Select all the pictures where you see yourself. Remember, one picture = one video</li>
        <li>Pay by card or use your credits. You can watch a video preview before buying.</li>
        <li>Watch and download all your waves in the “My sessions” tab.</li>
      </ol>
     
    </div>
  )
}
const FAQANS3 = ()=>{
  return (
    <div>
      
      <p>Surf Eye coaching is a premium service that costs €35 per session (VAT included). 
A coaching session allows you to get feedback from a professional coach and includes:
</p>
<ul>
  <li>30 minutes video call with professional coach</li>
  <li>Live video analysis of up to 8 waves</li>
  <li>Wave by wave feedback and corrections</li>
  <li>Tips both for inland and at sea exercises to improve your surfing</li>
</ul>
    </div>
  )
}

const FAQContent = () => {
  return (
    <div className="working__action__faq__content">
      <FAQQuestion
        answer={<FAQANS1/>}
        title="How do I get recorded?"
      />
      <FAQQuestion
        title="Should I book in advance?"
        answer="No, there is no need to book. Cameras are always on and everyone can get recorded at the same time. Just surf in the recording area."
      />
      <FAQQuestion
        title="Do I need a wearable device?"
        answer="No, there is no need to wear any device. To make it easier to recognise yourself you can wear a distinctive or colored item, but it’s up to you."
      />
      <FAQQuestion
        title="What is a session?"
        answer="A session is 2 hours of recording. Buying a session gives you access to all the waves you surfed in the next 2 hours from the selected starting time. "
      />
      <FAQQuestion
        title="What do I receive after buying a session?"
        answer="You will receive a video for every wave you surfed. You will be able to watch them online or download them to your device."
      />
      <FAQQuestion
        title="How long does it take?"
        answer="Within max. 12 hours you will be able to watch all the waves from your session."
      />
      <FAQQuestion
        title="How do I access my videos?"
        answer={<FAQANS2/>}/>
        <FAQQuestion
        title="What is Surf Eye coaching?"
        answer={<FAQANS3/>}
        />
      <FAQQuestion
        title="I surfed a couple of days ago and haven’t purchased my video yet. Am I still on time
to buy my video?"
        answer="Yes, you are still on time, but hurry up. All unclaimed videos are deleted 4 days after recording."
      />

      <div className="working__action__faq__content-contact">
        For any other questions, feel free to send us a message at
        yoursurfeye@gmail.com
      </div>
    </div>
  );
};

const FaqButton = () => {
  return (
    <div className="faq-button">
      <div className="faq-button-img">
        <img src={FaqSVG} alt="" />
      </div>
      <div className="faq-button-text">FAQ</div>
    </div>
  );
};

const handleScrollTop = ()=>{
  window.scrollTo(0,0)
}

const CardDesc = ()=>(<p>€12-€19 / SESSION</p>)
const RecordAreaDesc = ()=>(<p>IN THE RECORDING AREA <br/> JUST REMEMBER THE TIME</p>)
const Working = () => {
  return (
    <div className="working" id="HowitworksComponent">
      <div className="container working-container">
        <div className="working__heading heading-all">How it works</div>
        <div className="working__contents">
          <Item
            img={SurfSVG}
            title="1. SURF"
            desc={<RecordAreaDesc/>}
          />
          <Item
            img={SelectVideosSVG}
            title="2. Select videos"
            desc="OF YOUR WAVES"
          />
          <Item
            img={PaySVG}
            title="3. pay"
            desc={<CardDesc/>}
          />
          <Item
            img={DownloadSVG}
            title="4. Watch & download"
            desc="WAVE BY WAVE"
          />
        </div>
        <div className="working__action">
          <div className="working__action__container">
            <div className="working__action__faq">
              <DialogButton target={<FaqButton />} title="FAQs">
                <FAQContent />
              </DialogButton>
            </div>
            <div style={{cursor : 'pointer'}} className="working__action__button" onClick={handleScrollTop}>
              <div>Watch your session now</div>
              <BsFillPlayFill size={34} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
