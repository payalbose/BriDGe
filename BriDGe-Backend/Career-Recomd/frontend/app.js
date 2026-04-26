const API_URL = 'http://localhost:8080/api/v1';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recommendation-form');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');
    
    // UI States
    const emptyState = document.getElementById('empty-state');
    const loadingState = document.getElementById('loading-state');
    const resultsContainer = document.getElementById('results-container');
    
    // Result Elements
    const rolesGrid = document.getElementById('roles-grid');
    const criticalGaps = document.getElementById('critical-gaps');
    const optionalGaps = document.getElementById('optional-gaps');
    const coursesList = document.getElementById('courses-list');
    const roadmapContent = document.getElementById('roadmap-content');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Gather data
        const manualSkills = document.getElementById('manual_skills').value.trim();
        const resumeText = document.getElementById('resume_text').value.trim();
        const targetRole = document.getElementById('target_role').value.trim();
        const experienceLevel = document.getElementById('experience_level').value;

        if (!manualSkills && !resumeText) {
            showError("Please provide either current skills or a resume text.");
            return;
        }

        // Prepare Payload
        const payload = {
            experience_level: experienceLevel
        };

        if (manualSkills) {
            payload.manual_skills = manualSkills.split(',').map(s => s.trim()).filter(s => s);
        }
        if (resumeText) payload.resume_text = resumeText;
        if (targetRole) payload.target_role = targetRole;

        // Update UI
        hideError();
        showLoading();

        try {
            const response = await fetch(`${API_URL}/recommend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to fetch recommendations');
            }

            const data = await response.json();
            renderResults(data);
            showResults();
        } catch (error) {
            showError(error.message);
            resetUI();
        }
    });

    function renderResults(data) {
        // 1. Render Roles
        rolesGrid.innerHTML = data.recommended_roles.map(role => `
            <div class="role-row">
                <span class="role-name">${role.role_name}</span>
                <span class="score-badge">${(role.match_score * 100).toFixed(0)}% Match</span>
            </div>
        `).join('');

        // 2. Render Gaps
        const renderTags = (skills, type) => {
            if (!skills || skills.length === 0) {
                return `<span style="color: var(--text-muted); font-size: 0.85rem; font-style: italic;">No ${type} gaps found!</span>`;
            }
            return skills.map(skill => `<span class="tag ${type}">${skill}</span>`).join('');
        };

        criticalGaps.innerHTML = renderTags(data.skill_gap.critical, 'critical');
        optionalGaps.innerHTML = renderTags(data.skill_gap.optional, 'optional');

        // 3. Render Courses
        if (!data.courses || data.courses.length === 0) {
            coursesList.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem; font-style: italic;">No specific free courses found for these gaps.</p>`;
        } else {
            coursesList.innerHTML = data.courses.map(course => `
                <a href="${course.url}" target="_blank" rel="noopener noreferrer" class="course-item">
                    <div class="course-info">
                        <h4>${course.title}</h4>
                        <div class="course-meta">
                            <span class="platform-badge">${course.platform}</span>
                            <span style="text-transform: capitalize;">${course.difficulty || 'All Levels'}</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-arrow-up-right-from-square course-icon"></i>
                </a>
            `).join('');
        }

        // 4. Render Roadmap
        if (Array.isArray(data.roadmap)) {
            roadmapContent.innerHTML = data.roadmap.map(step => `
                <div class="roadmap-step">
                    <div class="step-header">
                        <h4>${step.phase}</h4>
                    </div>
                    <div class="step-body">
                        <p class="focus-text"><strong>Focus:</strong> ${step.focus}</p>
                        <div class="topics-tags">
                            ${step.topics.map(t => `<span class="tag small">${t}</span>`).join('')}
                        </div>
                        <p class="projects-text"><strong>Projects:</strong> ${step.projects.join(', ')}</p>
                    </div>
                </div>
            `).join('');
        } else {
            roadmapContent.textContent = data.roadmap;
        }
    }

    // UI Helpers
    function showLoading() {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Analyzing...';
        if (emptyState) emptyState.classList.add('hidden');
        resultsContainer.classList.add('hidden');
        loadingState.classList.remove('hidden');
    }

    function showResults() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Generate Roadmap</span><i class="fa-solid fa-chevron-right"></i>';
        loadingState.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
    }

    function resetUI() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Generate Roadmap</span><i class="fa-solid fa-chevron-right"></i>';
        loadingState.classList.add('hidden');
        if (emptyState) emptyState.classList.remove('hidden');
    }

    function showError(msg) {
        errorMessage.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${msg}`;
        errorMessage.classList.remove('hidden');
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }
});
