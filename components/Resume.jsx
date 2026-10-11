import resumeImage from '../assets/resume.png';

const Resume = () => {
    return(
        <div className="resume-wrapper" style={{width:'100%'}}>
            <div className="resume-container" style={{width:'100%', minHeight: '100vh', display:'flex', alignItems:'center', justifyContent:'center', padding: '20px'}}>
                <img width={800} src={resumeImage} alt="Resume" style={{ maxWidth: '100%', height: 'auto', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
            </div>
        </div>
    )
}

export default Resume;