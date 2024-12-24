export const deleteSession = (sessionId) =>
	fetch(`http://localhost:3005/sessions/${sessionId}`, { method: 'DELETE' });
