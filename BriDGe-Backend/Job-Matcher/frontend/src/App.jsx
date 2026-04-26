import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resumeId, setResumeId] = useState(null)
  const [parsedData, setParsedData] = useState(null)
  const [jobs, setJobs] = useState([])
  const [matchingStatus, setMatchingStatus] = useState('')
  const [progress, setProgress] = useState(0)
  const [isMatching, setIsMatching] = useState(false)

  useEffect(() => {
    let timer;
    if (isMatching) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 95) return 95;
          return oldProgress + Math.random() * 5;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isMatching]);

  // Filter states
  const [minScore, setMinScore] = useState(50)

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await fetch('http://localhost:8002/upload-resume', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      if (response.ok) {
        setResumeId(data.resume_id)
        setParsedData(data.parsed_data)
        startMatching(data.resume_id)
      } else {
        alert("Error uploading: " + data.detail)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to connect to server")
    } finally {
      setLoading(false)
    }
  }

  const startMatching = async (id) => {
    setIsMatching(true)
    setProgress(0)
    setMatchingStatus('Finding jobs...')
    try {
      await fetch(`http://localhost:8002/match/${id}`, { method: 'POST' })
      // Poll for jobs every 5 seconds
      const intervalId = setInterval(() => fetchJobs(id, intervalId), 5000)
    } catch (error) {
      console.error("Match error:", error)
      setMatchingStatus('Error starting match process.')
    }
  }

  const fetchJobs = async (id, intervalId) => {
    try {
      const response = await fetch(`http://localhost:8002/jobs/${id}`)
      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
          setJobs(data)
          if (isMatching) {
            setProgress(100)
            setTimeout(() => {
              setIsMatching(false)
              setMatchingStatus(`Found ${data.length} matched jobs!`)
            }, 500)
          } else {
             setMatchingStatus(`Found ${data.length} matched jobs!`)
          }
        }
      }
    } catch (error) {
      console.error("Fetch jobs error:", error)
    }
  }

  const filteredJobs = jobs.filter(job => job.match_score >= minScore)

  return (
    <div className="app-container">
      <header className="header">
        <h1>AI Job Matcher</h1>
        <p>Upload your resume and let AI find your next perfect role</p>
      </header>

      {!resumeId && (
        <div className="upload-card">
          <h2>Upload Resume</h2>
          <p style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>PDF or TXT format</p>
          
          <div className="file-input-wrapper">
            <button className="btn btn-secondary" style={{position: 'relative', zIndex: 0}}>
              {file ? file.name : 'Choose File'}
            </button>
            <input type="file" accept=".pdf,.txt" onChange={handleFileChange} />
          </div>
          
          <div style={{marginTop: '1rem'}}>
            <button 
              className="btn" 
              onClick={handleUpload} 
              disabled={!file || loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
          {loading && <div className="loader"></div>}
        </div>
      )}

      {parsedData && (
        <div className="upload-card" style={{maxWidth: '1000px', marginBottom: '2rem'}}>
          <h2 style={{color: 'var(--primary)'}}>Resume Analyzed</h2>
          <div className="parsed-data" style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
            <div style={{flex: 1}}>
              <p><strong>Experience Level:</strong> {parsedData.experience_level}</p>
              <p><strong>Job Role(s):</strong> {parsedData.preferred_roles?.join(', ')}</p>
            </div>
            <div style={{flex: 2}}>
              <p><strong>Top Skills:</strong></p>
              <div className="skill-tags" style={{marginTop: '0.5rem'}}>
                {parsedData.skills?.map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </div>
          </div>
          
          {isMatching ? (
            <div className="progress-container" style={{marginTop: '2rem'}}>
              <div className="progress-bar-background" style={{width: '100%', height: '12px', borderRadius: '10px', overflow: 'hidden'}}>
                <div className="progress-bar-fill" style={{width: `${progress}%`, height: '100%', transition: 'width 0.5s ease-out'}}></div>
              </div>
              <p style={{marginTop: '0.8rem', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center'}}>
                AI Finding the best Job revelant to your Resume... {Math.round(progress)}%
              </p>
            </div>
          ) : (
            matchingStatus && (
              <div style={{marginTop: '1rem', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {matchingStatus}
              </div>
            )
          )}
        </div>
      )}

      {jobs.length > 0 && (
        <>
          <div className="filters-bar" style={{marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
             <span style={{fontWeight: 'bold', color: 'var(--text-muted)'}}>Filters:</span>
             <label>Min Match Score ({minScore}%): </label>
             <input type="range" min="30" max="100" value={minScore} onChange={(e) => setMinScore(e.target.value)} />
          </div>
          
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <div className="job-card" key={job.job_id}>
                <div className="job-header">
                  <div>
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-company">{job.company}</div>
                  </div>
                  <div className="match-score" style={{
                      backgroundColor: job.match_score > 80 ? 'rgba(16, 185, 129, 0.2)' : job.match_score > 60 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: job.match_score > 80 ? '#10B981' : job.match_score > 60 ? '#F59E0B' : '#EF4444',
                      borderColor: job.match_score > 80 ? '#10B981' : job.match_score > 60 ? '#F59E0B' : '#EF4444'
                  }}>
                    {job.match_score}% Match
                  </div>
                </div>
                
                <div className="job-body">
                  <p className="reasoning">{job.reasoning}</p>
                  
                  {job.missing_skills && job.missing_skills.length > 0 && (
                    <div className="skills-container">
                      <div className="skills-title">Missing Skills</div>
                      <div className="skill-tags">
                        {job.missing_skills.map((skill, i) => (
                          <span key={i} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="job-footer">
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-link">
                    View & Apply
                  </a>
                </div>
              </div>
            ))}
            
            {filteredJobs.length === 0 && (
              <div style={{color: 'var(--text-muted)', fontStyle: 'italic', gridColumn: '1 / -1', textAlign: 'center'}}>
                No jobs found matching your current filters.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
