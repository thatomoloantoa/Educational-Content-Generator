import React, { useState } from 'react';
import './ContentGenerator.css';

// Education content templates for high school (grades 8-12)
const EDUCATION_TEMPLATES = [
  { 
    label: 'Lesson Plan', 
    value: 'lesson_plan', 
    template: 'Create a comprehensive lesson plan for high school students (grades 8-12) on the topic: ' 
  },
  { 
    label: 'Study Guide', 
    value: 'study_guide', 
    template: 'Generate a detailed study guide for high school students (grades 8-12) covering: ' 
  },
  { 
    label: 'Quiz Questions', 
    value: 'quiz', 
    template: 'Create engaging quiz questions for high school students (grades 8-12) about: ' 
  },
  { 
    label: 'Assignment Instructions', 
    value: 'assignment', 
    template: 'Write clear assignment instructions for high school students (grades 8-12) on: ' 
  },
  { 
    label: 'Review Sheet', 
    value: 'review', 
    template: 'Develop a comprehensive review sheet for high school students (grades 8-12) covering: ' 
  },
];

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const ContentGenerator: React.FC = () => {
  const [contentType, setContentType] = useState(EDUCATION_TEMPLATES[0].value);
  const [topic, setTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('9-10');
  const [subject, setSubject] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [performance, setPerformance] = useState<{ time?: number; tokens?: number }>({});

  const buildPrompt = () => {
    const template = EDUCATION_TEMPLATES.find(t => t.value === contentType)?.template || '';
    return `${template}${topic}\n\nSubject: ${subject}\nGrade Level: ${gradeLevel}\n\nPlease create engaging, age-appropriate content that follows educational best practices and includes clear learning objectives.`;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutput('');
    const start = Date.now();
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      setError('Gemini API key not found. Please check your .env file.');
      setLoading(false);
      return;
    }
    const prompt = buildPrompt();
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });
      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setOutput(data.candidates[0].content.parts[0].text);
        setPerformance({ time: Date.now() - start, tokens: data.usageMetadata?.totalTokens || undefined });
      } else if (data.error) {
        setError(data.error.message || 'Unknown error from Gemini API.');
      } else {
        setError('No content generated.');
      }
    } catch (err: any) {
      setError('Failed to connect to Gemini API.');
    }
    setLoading(false);
  };

  const handleExport = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contentType}-${topic.replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="education-content-container">
      <div className="header-section">
        <h1>Education Content Creator</h1>
        <p>Create engaging lesson plans and study guides for high school students (Grades 8-12)</p>
      </div>
      
      <div className="main-content">
        <div className="input-section">
          <h2>Create Your Content</h2>
          <form onSubmit={handleGenerate} className="education-form">
            <div className="form-group">
              <label htmlFor="contentType">Content Type:</label>
              <select 
                id="contentType"
                value={contentType} 
                onChange={e => setContentType(e.target.value)}
                className="form-select"
              >
                {EDUCATION_TEMPLATES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input 
                id="subject"
                type="text" 
                value={subject} 
                onChange={e => setSubject(e.target.value)} 
                placeholder="e.g., Mathematics, Science, English, History"
                className="form-input"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="gradeLevel">Grade Level:</label>
              <select 
                id="gradeLevel"
                value={gradeLevel} 
                onChange={e => setGradeLevel(e.target.value)}
                className="form-select"
              >
                <option value="8">Grade 8</option>
                <option value="9-10">Grades 9-10</option>
                <option value="11-12">Grades 11-12</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="topic">Topic/Content Description:</label>
              <textarea 
                id="topic"
                value={topic} 
                onChange={e => setTopic(e.target.value)} 
                placeholder="Describe the topic, concept, or content you want to create..."
                className="form-textarea"
                rows={6}
                required 
              />
            </div>

            <button type="submit" disabled={loading} className="generate-button">
              {loading ? 'Creating Content...' : 'Generate Content'}
            </button>
          </form>
        </div>

        <div className="output-section">
          <h2>Generated Content</h2>
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Creating your educational content...</p>
            </div>
          )}
          {error && <p className="error">{error}</p>}
          {output && (
            <>
              <div className="content-display">
                <pre>{output}</pre>
              </div>
              <button onClick={handleExport} className="export-button">
                Download Content
              </button>
            </>
          )}
          {performance.time && (
            <div className="performance">
              <p>Generation Time: {performance.time} ms</p>
              {performance.tokens && <p>Token Usage: {performance.tokens}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator; 