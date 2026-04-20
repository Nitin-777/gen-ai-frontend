import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import {useNavigate , useParams} from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth.js'

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical')
  const [expandedQuestion, setExpandedQuestion] = useState(0)
  const { report, getReportById, loading } = useInterview()
  const { handleLogout } = useAuth()
  const{ interviewId }= useParams()

  useEffect(() =>{
    if(interviewId){
      getReportById(interviewId)
    }

  }, [ interviewId ])

  if(loading || !report){
    return(
      <main className='loading-screen'>
        <h1>Loading your interview plan....</h1>
      </main>
    )
  }
  const getQuestions = () => {
    return activeTab === 'technical' ? report.technicalQuestions : report.behavioralQuestions
  }

  const questions = getQuestions()
  const sectionName = activeTab === 'technical' ? 'Technical Questions' : 'Behavioral Questions'

  return (
    <div className='interview'>
      {/* Left Sidebar */}
      <aside className='interview__sidebar interview__sidebar--left'>
        <div className='interview-sidebar__header'>
          <h3 className='interview-sidebar__title'>SECTIONS</h3>
        </div>
        <nav className='interview-nav'>
          <button
            className={`interview-nav__item ${activeTab === 'technical' ? 'interview-nav__item--active' : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            <span className='interview-nav__icon'>&lt;&gt;</span>
            <span>Technical Questions</span>
          </button>
          <button
            className={`interview-nav__item ${activeTab === 'behavioral' ? 'interview-nav__item--active' : ''}`}
            onClick={() => setActiveTab('behavioral')}
          >
            <span className='interview-nav__icon'>☑</span>
            <span>Behavioral Questions</span>
          </button>
          <button
            className={`interview-nav__item ${activeTab === 'roadmap' ? 'interview-nav__item--active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <span className='interview-nav__icon'>↗</span>
            <span>Road Map</span>
          </button>
          <button
            className='interview-nav__item interview-nav__item--logout'
            onClick={handleLogout}
          >
            <span className='interview-nav__icon'>🚪</span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='interview__main'>
        {activeTab !== 'roadmap' ? (
          <>
            {/* Section Header */}
            <div className='interview__section-header'>
              <h1 className='interview__section-title'>{sectionName}</h1>
              <p className='interview__section-count'>{questions.length} questions</p>
            </div>

            {/* Questions List */}
            <div className='questions-list'>
              {questions.map((item, index) => (
                <div
                  key={index}
                  className={`question-card ${expandedQuestion === index ? 'question-card--expanded' : ''}`}
                >
                  <button
                    className='question-card__header'
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? -1 : index)}
                  >
                    <div className='question-card__title'>
                      <span className='question-card__number'>Q{index + 1}</span>
                      <p className='question-card__text'>{item.question}</p>
                    </div>
                    <span className='question-card__toggle'>
                      {expandedQuestion === index ? '▲' : '▼'}
                    </span>
                  </button>

                  {expandedQuestion === index && (
                    <div className='question-card__content'>
                      <div className='question-detail'>
                        <h4 className='question-detail__label'>INTENTION</h4>
                        <p className='question-detail__text'>{item.intention}</p>
                      </div>
                      <div className='question-detail'>
                        <h4 className='question-detail__label question-detail__label--answer'>MODEL ANSWER</h4>
                        <p className='question-detail__text'>{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Road Map Header */}
            <div className='interview__roadmap-header'>
              <h1 className='interview__roadmap-title'>Preparation Road Map</h1>
              <p className='interview__roadmap-subtitle'>{report.preparationPlan.length}-day plan</p>
            </div>

            {/* Timeline */}
            <div className='timeline'>
              {report.preparationPlan.map((plan, index) => (
                <div key={index} className='timeline__item'>
                  <div className='timeline__marker'>
                    <div className='timeline__dot'></div>
                    {index < report.preparationPlan.length - 1 && <div className='timeline__line'></div>}
                  </div>
                  <div className='timeline__content'>
                    <div className='timeline__day'>Day {plan.day}</div>
                    <h3 className='timeline__title'>{plan.focus}</h3>
                    <ul className='timeline__subtasks'>
                      {plan.tasks.map((subtask, subIndex) => (
                        <li key={subIndex} className='timeline__subtask'>{subtask}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Right Sidebar */}
      <aside className='interview__sidebar interview__sidebar--right'>
        <div className='interview__sidebar-content'>
          {/* Match Score Card */}
          <section className='match-score-section'>
            <div className='match-score-card'>
              <div className='match-score-card__circle'>
                <div className='match-score-card__ring'></div>
                <span className='match-score-card__value'>{report.matchScore}</span>
              </div>
              <p className='match-score-card__label'>Match Score</p>
            </div>
          </section>

          {/* Skill Gaps Section */}
          <section className='skill-gaps-section'>
            <h3 className='skill-gaps-section__title'>Skill Gaps</h3>
            <div className='skill-tags'>
              {report.skillGaps.map((gap, index) => (
                <button key={index} className={`skill-tag skill-tag--${gap.severity}`}>
                  {gap.skill}
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  )
}

export default Interview
