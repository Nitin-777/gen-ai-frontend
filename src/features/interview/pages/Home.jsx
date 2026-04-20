import React, {useState, useRef} from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview.js';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth.js';

const Home = () => {
  const MAX_JOB_DESCRIPTION_CHARS = 5000;

  const { loading,generateReport, reports} = useInterview()
  const { user, handleLogout } = useAuth()

  const [jobDescription, setJobDescription] = useState("")
  const[selfDescription, setSelfDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const resumeInputRef= useRef()
  const navigate=useNavigate()

  const handleGenerateReport= async (e)=>{
    e.preventDefault()
    const resumeFile=resumeInputRef.current.files[0]
   const data= await generateReport({jobDescription, selfDescription, resumeFile})
   if(data){
     navigate(`/interview/${data._id}`)
   }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file.name)
    }
  }

  if(loading){
    return(
      <main className='laoding-screen'>
          <h1>Loading your interview plan .....</h1>

      </main>
    )
  }


  return (
    <main className='home'>
      {/* Header Section */}
      <section className='home__header'>
        <div className='home__header-content'>
          <div>
            <h1 className='home__title'>
              Create Your Custom <span className='home__title--highlight'>Interview Plan</span>
            </h1>
            <p className='home__subtitle'>
              Let our AI analyze the job requirements and your unique profile to build a winning strategy.
            </p>
          </div>
          <button className='home__logout-btn' onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
        <div className='home__indicator'>•</div>
      </section>

      {/* Main Content Section */}
      <section className='home__content'>
        <div className='interview-card'>
          {/* Left Column - Job Description */}
          <div className='interview-card__column interview-card__column--left'>
            <div className='form-group'>
              <div className='form-group__header'>
                <div className='form-group__icon'>🎯</div>
                <h2 className='form-group__title'>Target Job Description</h2>
                <span className='form-group__required'>Required</span>
              </div>
              
              <textarea
              onChange={(e) => {setJobDescription(e.target.value)}}
                className='textarea'
                name='jobDescription'
                id='jobDescription'
                placeholder='Paste the full job description here...
e.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."'
                maxLength={MAX_JOB_DESCRIPTION_CHARS}
              />
              
              <div className='form-group__footer'>
                <span className='char-count'>{jobDescription.length} / {MAX_JOB_DESCRIPTION_CHARS} chars</span>
              </div>
            </div>
          </div>

          {/* Right Column - Profile */}
          <div className='interview-card__column interview-card__column--right'>
            <div className='form-group'>
              <div className='form-group__header'>
                <div className='form-group__icon'>�</div>
                <h2 className='form-group__title'>Your Profile</h2>
              </div>

              {/* Resume Upload Section */}
              <div className='upload-section'>
                <p className='upload-section__label'>
                  Upload Resume <small className='upload-section__hint'>(PDF files only)</small>
                </p>

                <label className='upload-dropzone' htmlFor='resume'>
                  <div className='upload-dropzone__content'>
                    <div className='upload-dropzone__icon'>📤</div>
                    <p className='upload-dropzone__text'>Click to upload or drag & drop</p>
                    <p className='upload-dropzone__format'>PDF or DOCX Max 5MB</p>
                  </div>
                </label>
                {selectedFile && (
                  <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#1a3a52', borderRadius: '4px', color: '#00ff88' }}>
                    ✅ File selected: {selectedFile}
                  </div>
                )}
                <input
                  ref={resumeInputRef}
                  type='file'
                  name='resume'
                  id='resume'
                  accept='.pdf,.docx'
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Divider */}
              <div className='divider'>
                <span className='divider__text'>OR</span>
              </div>

              {/* Self Description Section */}
              <div className='form-group__section'>
                <label className='form-label' htmlFor='selfDescription'>
                  Quick Self-Description
                </label>
                <textarea
                onChange={(e) => {setSelfDescription(e.target.value)}}
                  className='textarea'
                  name='selfDescription'
                  id='selfDescription'
                  placeholder='Briefly describe your experience, key skills, and years of experience if you don&apos;t have a resume handy...'
                />
              </div>

              {/* Requirement Note */}
              <div className='requirement-note'>
                <div className='requirement-note__icon'>✨</div>
                <p className='requirement-note__text'>
                  Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Button Section */}
      <section className='home__footer'>
        <button onClick={handleGenerateReport} className='button button--primary'>
          🚀 Generate My Interview Strategy
        </button>
        <p className='home__processing-info'>AI-Powered Strategy Generation • Approx 30s</p>
      </section>

         { /*reports list */}
         {reports.length > 0 &&(
              <section className='recent-reports'>
                <h2 className='recent-reports__title'><span style={{marginRight: '0.5rem'}}>🏆</span>My Recent Interview Plans</h2>
                <ul className='reports-list'>
                  {reports.map(report =>(
                       <li key={report._id} className='report-item' onClick={()=> navigate(`/interview/${report._id}`)}>
                         <div className='report-item__header'>
                           <h3 className='report-item__title'>{report.title || 'Untitled position'}</h3>
                           <div className='report-item__score'>
                             <span className='report-item__score-value'>{report.matchScore || 0}</span>
                             <span className='report-item__score-label'>Match</span>
                           </div>
                         </div>
                         <p className='report-item__meta'>⏰ {new Date(report.createdAt).toLocaleDateString()}</p>
                       </li>
                  ))}
                </ul>
              </section>
         )}
          


      {/* Bottom Footer */}
      <footer className='home__bottom-footer'>
        <a href='#privacy'>Privacy Policy</a>
        <a href='#terms'>Terms of Service</a>
        <a href='#help'>Help Center</a>
      </footer>
    </main>
  )
}

export default Home