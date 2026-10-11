
  import react from "react";
  import { useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  import { LiaShoppingBagSolid } from "react-icons/lia";
  import { HiOutlineMusicalNote } from "react-icons/hi2";
  import { MdOutlineMovie } from "react-icons/md";
  import { IoGameControllerOutline } from "react-icons/io5";
  import { RiNewsLine } from "react-icons/ri";
  import { IoTrophyOutline } from "react-icons/io5";
  import { MdOutlinePodcasts } from "react-icons/md";
  import { SiYoutubekids } from "react-icons/si";
  import { FaYoutube } from "react-icons/fa";
  import { SiYoutubestudio } from "react-icons/si";
  import { SiYoutubemusic } from "react-icons/si";
  import { IoSettingsOutline } from "react-icons/io5";
  import { MdOutlineReportProblem } from "react-icons/md";
  import { IoIosHelpCircleOutline } from "react-icons/io";
  import { RiFeedbackLine } from "react-icons/ri";
  import { GiHanger } from "react-icons/gi";
 




  const SideBar = ({category,setCategory}) => {


      const isMenuOpen = useSelector((store) => store.youtube.isMenuOpen)

    
      
      
      return  (
          <div className={`sideBar-container ${isMenuOpen ? "expanded-sidebar" : "collapsed-sidebar"}`}>
              <div className="side-icons-container">
                  <div className={` ${!isMenuOpen ? "collapsed-home" : "side-link"} `}  >
            <a href="/" style={{display:'flex',alignItems:"center",textDecoration:'none',color:'black'}}>      <img src="https://img.icons8.com/?size=100&id=2797&format=png&color=000000" /> {isMenuOpen && <p>Home</p> } </a>
                { !isMenuOpen && <a href="/" style={{textDecoration:'none', color:'inherit'}}><p className="home">Home</p></a>   }
                  </div>
                  <div className={` ${!isMenuOpen ? "collapsed-home" : "side-link"} `} onClick={() => setCategory(10)} >
                      <img src="https://supersimple.dev/exercises/youtube/icons/explore.svg" /> {isMenuOpen && <p>Explore</p> }     { !isMenuOpen && <p className="home">Explore</p>   }
                  </div>
                  <div className={` ${!isMenuOpen ? "collapsed-home" : "side-link"} `} onClick={() => setCategory(0)}>
                      <img src="https://supersimple.dev/exercises/youtube/icons/subscriptions.svg" /> {isMenuOpen && <p>Subscription</p> } { !isMenuOpen && <p className="home">Subscription</p>   }
                 
                  </div>
                      <div className={` ${!isMenuOpen ? "collapsed-home" : "side-link"} `} onClick={() => setCategory(20)}>
                          <img src="https://img.icons8.com/?size=100&id=JtRYpjtdhzhs&format=png&color=000000" /> {isMenuOpen &&  <p>Gaming</p> }    { !isMenuOpen && <p className="home">Gaming</p>   }    
                  </div>
       
          
              <div className={` ${!isMenuOpen ? "collapsed-home" : "side-link"} `} onClick={() => setCategory(0)}>
                <img src="https://supersimple.dev/exercises/youtube/icons/library.svg" /> {isMenuOpen &&  <p>Studio</p> }    { !isMenuOpen && <p className="home">You</p>   }    
               
              </div>

              

                        {isMenuOpen && (
            <>
              <div className="side-link" onClick={() => setCategory(26)}>
                <img src="https://img.icons8.com/?size=100&id=dZT3DuX5xVbx&format=png&color=000000" />
                <p>Live</p>
              </div>
             
            </>
          )}
              </div>
            {isMenuOpen && <hr style={{marginTop:'20px'}} /> }  


           {isMenuOpen &&  <div className="subscribtion-container">
                  <p className="subscription-title">Subscription</p>

                  <div className="subscription-link">
                    <img width="27" src="https://yt3.googleusercontent.com/ytc/AIdro_md2CfeGP7cDguRmrpRdM3a1r_gOniMzennD6141VLFw70=s176-c-k-c0x00ffffff-no-rj-mo"/>
                    <p>Akshay Saini</p>
                  </div>

                   <div className="subscription-link">
                    <img width="27" src="https://yt3.googleusercontent.com/ytc/AIdro_laf9dDyNATE1_RdVUKthwnwT9TSm9N0my0jL2H8gCvjw=s176-c-k-c0x00ffffff-no-rj-mo"/>
                    <p>SuperSimpleDev</p>
                  </div>

                    <div className="subscription-link">
                    <img width="27" src="https://yt3.ggpht.com/Y_G09q2it3FZMrbbxwLjgMjSanR1mZAsXnEE6g6ZaBXlq2dLIRsKqSrGTCMuiyvvVavu-xFvPEc=s68-c-k-c0x00ffffff-no-rj"/>
                    <p>Udemy</p>
                  </div>


                   <div className="subscription-link">
                    <img width="27" src="https://yt3.ggpht.com/QZb768e73_xc0UOIZSHxhIz4ZevZTUw9DYriMZFud7L6tmotOAOwyxiBw3DJ48Lh_S7uZtmcdA=s176-c-k-c0x00ffffff-no-rj-mo"/>
                    <p>ChidresTechTutorials</p>
                  </div>

                  <div className="subscription-link">
                    <img width="27" src="https://yt3.googleusercontent.com/ytc/AIdro_mKzklyPPhghBJQH5H3HpZ108YcE618DBRLAvRUD1AjKNw=s176-c-k-c0x00ffffff-no-rj-mo"/>
                    <p>Fireship</p>
                  </div>

                  <div className="subscription-link">
                    <img width="27" src="https://yt3.ggpht.com/0nsZM3NF0C9bFr2IFXicMJ1w82ldRaZvGKFnezBe2lpW7F9gI92FaLubcTghnNNt4Ld8DfRvEMo=s176-c-k-c0x00ffffff-no-rj-mo"/>
                    <p>Telusko</p>
                  </div>

                      <div className="subscription-link">
                    <img width="27" src="https://yt3.ggpht.com/ytc/AIdro_lGRc-05M2OoE1ejQdxeFhyP7OkJg9h4Y-7CK_5je3QqFI=s68-c-k-c0x00ffffff-no-rj"/>
                    <p>freeCodeCamp.org</p>
                  </div>

                

              </div>  }
                 {isMenuOpen && <hr style={{marginTop:'20px'}} /> }  



            {isMenuOpen &&

                <div className="explore-container">
                  <p className="explore-title">Explore</p>
                  <div className="explore-link">
                  <LiaShoppingBagSolid size={27}/>

                    <p>Shopping</p>
                  </div>

                  <div className="explore-link">
                   <HiOutlineMusicalNote  size={27}/>
                    <p>Music</p>
                  </div>

                     <div className="explore-link">
                    <MdOutlineMovie  size={27} />
                    <p>Movies</p>
                  </div>

                  <div className="explore-link">
                    <img width="27" src="https://img.icons8.com/?size=100&id=dZT3DuX5xVbx&format=png&color=000000"/>
                    <p>Live</p>
                  </div>

                  <div className="explore-link">
                    <IoGameControllerOutline size={27} />
                    <p>Gaming</p>
                  </div>

                   <div className="explore-link">
                   <RiNewsLine size={27}/>
                    <p>News</p>
                  </div>

                  <div className="explore-link">
                    <IoTrophyOutline  size={27} />
                    <p>Sports</p>
                  </div>

                    <div className="explore-link">
                    <img src="https://img.icons8.com/?size=100&id=LwMx7mOPGxUH&format=png&color=000000" width={30}/>
                    <p>Courses</p>
                  </div>



                    <div className="explore-link">
                    <GiHanger  size={27} />
                    <p>Fashion & Beauty</p>
                  </div>

                  
                    <div className="explore-link">
                    <MdOutlinePodcasts  size={27}/>
                    <p>Podcasts</p>
                  </div>


              </div>}   
                 {isMenuOpen && <hr style={{marginTop:'20px'}} /> }  

               
               
               
               {isMenuOpen &&  <div className="more-from-youtube-container">
                    <p className="youtube-title">More from Youtube</p>
                      <div className="youtube-link">
                          <FaYoutube size={27} color="#ff0033" />
                        <p>YouTube Premium</p>
                    </div>

                      <div className="youtube-link">
                       <SiYoutubestudio size={27} color="#ff0033" />
                        <p>Youtube Studio</p>
                    </div>

                      <div className="youtube-link">
                          <SiYoutubemusic  size={27} color="#ff0033" />
                        <p>YouTube Music</p>
                    </div>


                      <div className="youtube-link">
                        <SiYoutubekids size={26} color="#ff0033" />
                        <p>YouTube Kids</p>
                    </div>
               </div> }
              
               {isMenuOpen && <hr style={{marginTop:'20px'}} /> }  



              {isMenuOpen && <div className="settings-container"> 
                  <div className="settings-link">
                    <IoSettingsOutline size={26} />
                    <p>Settings</p>
                  </div>

                  <div className="settings-link">
                    <MdOutlineReportProblem   size={26}/>
                    <p>Report</p>
                  </div>


                   <div className="settings-link">
                    <IoIosHelpCircleOutline   size={26} />
                    <p>Help</p>
                  </div>

                  <div className="settings-link">
                    <RiFeedbackLine size={26} />
                    <p>Settings</p>
                  </div>
                  
              </div> }
              
              

                 {isMenuOpen && <hr style={{marginTop:'20px'}} /> }  



              {isMenuOpen &&            <div className="about-container">
                 <div className="about"> 
                  <p>About Press Copyright  </p>
                  <p>Contact us Creators Advertise </p>
                  <p>Developers</p>
                 </div>

                 <div className="about"> 
                  <p>Terms Privacy Policy & Safety </p>
                  <p>How YouTube works </p>
                  <p>Test new features</p>
                 </div>

                 <div className="about-copyright"> 
                  <p>© 2025 Google LLC  </p>
                 </div>


              </div>}
    

          </div>
      );
  };

  export default SideBar;