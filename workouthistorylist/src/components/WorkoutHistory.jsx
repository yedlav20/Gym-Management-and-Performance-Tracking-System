import React, { useState } from "react";
const MOCK_WORKOUTS = [
  {
    id: 1,
    date: "2025-10-01",
    name: "Upper Body Strength",
    status: "Completed",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8, weight: "40kg", notes: "Felt solid" },
      { name: "Lat Pulldown", sets: 3, reps: 10, weight: "30kg", notes: "" },
    ],
  },
  {
    id: 2,
    date: "2025-10-03",
    name: "Lower Body Strength",
    status: "Completed",
    exercises: [
      { name: "Squat", sets: 4, reps: 6, weight: "60kg", notes: "Heavy but OK" },
      { name: "Romanian Deadlift", sets: 3, reps: 8, weight: "40kg", notes: "" },
    ],
  },
  {
    id: 3,
    date: "2025-10-05",
    name: "HIIT Cardio",
    status: "Missed",
    exercises: [],
  },
  {
    id: 4,
    date: "2025-10-07",
    name: "Full Body Circuit",
    status: "Partial",
    exercises: [
      { name: "Push-ups", sets: 3, reps: 12, weight: "Bodyweight", notes: "" },
      { name: "Goblet Squat", sets: 2, reps: 12, weight: "12kg", notes: "" },
    ],
  },
  {
    id: 5,
    date: "2025-10-09",
    name: "Pull Day",
    status: "Completed",
    exercises: [
      { name: "Pull-ups", sets: 3, reps: 6, weight: "Bodyweight", notes: "Hard" },
      { name: "Seated Row", sets: 3, reps: 10, weight: "25kg", notes: "" },
    ],
  },
];

function WorkoutHistory() {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [feedback, setFeedback] = useState({}); // { [id]: { rating, comment } }

  const handleSelectWorkout = (workoutId) => {
    setSelectedWorkoutId((current) =>
      current === workoutId ? null : workoutId
    );
  };

  const handleFeedbackChange = (workoutId, field, value) => {
    setFeedback((prev) => ({
      ...prev,
      [workoutId]: {
        ...prev[workoutId],
        [field]: value,
      },
    }));
  };

  const handleSaveFeedback = (workoutId) => {
    const fb = feedback[workoutId];
    if (!fb || !fb.rating) {
      alert("Please select a rating before saving.");
      return;
    }
    console.log("Saved feedback for workout:", workoutId, fb);
    alert("Your feedback has been saved (locally for now).");
  };

  const workouts = MOCK_WORKOUTS; 
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Workout History</h1>

      {workouts.length === 0 ? (
        <p style={styles.noWorkoutsText}>No workouts</p>
      ) : (
        <div style={styles.cardGrid}>
          {workouts.map((workout) => {
            const isSelected = workout.id === selectedWorkoutId;
            const fb = feedback[workout.id] || { rating: "", comment: "" };

            return (
              <div
                key={workout.id}
                style={{
                  ...styles.card,
                  ...(isSelected ? styles.cardSelected : {}),
                }}
                onClick={() => handleSelectWorkout(workout.id)}
              >
                {/* Basic summary */}
                <div style={styles.cardHeader}>
                  <div>
                    <div style={styles.workoutName}>{workout.name}</div>
                    <div style={styles.workoutMeta}>{workout.date}</div>
                  </div>
                  <div style={{ ...styles.statusBadge, ...statusStyle(workout.status) }}>
                    {workout.status}
                  </div>
                </div>

                {/* Expanded details when selected */}
                {isSelected && (
                  <div style={styles.detailsSection} onClick={(e) => e.stopPropagation()}>
                    <h3 style={styles.detailsTitle}>Details</h3>

                    {workout.exercises && workout.exercises.length > 0 ? (
                      <table style={styles.table}>
                        <thead>
                          <tr>
                            <th style={styles.th}>Exercise</th>
                            <th style={styles.th}>Sets</th>
                            <th style={styles.th}>Reps</th>
                            <th style={styles.th}>Weight</th>
                            <th style={styles.th}>Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {workout.exercises.map((ex, index) => (
                            <tr key={index}>
                              <td style={styles.td}>{ex.name}</td>
                              <td style={styles.td}>{ex.sets}</td>
                              <td style={styles.td}>{ex.reps}</td>
                              <td style={styles.td}>{ex.weight}</td>
                              <td style={styles.td}>{ex.notes || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={styles.noExercisesText}>
                        No exercises logged for this workout.
                      </p>
                    )}

                    {/* Rating & Comment section */}
                    <div style={styles.feedbackSection}>
                      <h4 style={styles.feedbackTitle}>
                        Rate how hard this workout was
                      </h4>
                      <select
                        value={fb.rating}
                        onChange={(e) =>
                          handleFeedbackChange(workout.id, "rating", e.target.value)
                        }
                        style={styles.select}
                      >
                        <option value="">Select rating (1 = Easy, 5 = Brutal)</option>
                        <option value="1">1 - Very Easy</option>
                        <option value="2">2 - Easy</option>
                        <option value="3">3 - Moderate</option>
                        <option value="4">4 - Hard</option>
                        <option value="5">5 - Very Hard</option>
                      </select>

                      <label style={styles.commentLabel}>
                        Short comment for your trainer
                      </label>
                      <textarea
                        value={fb.comment}
                        onChange={(e) =>
                          handleFeedbackChange(workout.id, "comment", e.target.value)
                        }
                        placeholder="Example: Legs were shaking on the last set!"
                        style={styles.textarea}
                      />

                      <button
                        type="button"
                        onClick={() => handleSaveFeedback(workout.id)}
                        style={styles.saveButton}
                      >
                        Save Feedback
                      </button>

                      {fb.rating && (
                        <p style={styles.savedText}>
                          Current rating: <strong>{fb.rating}/5</strong>
                          {fb.comment ? ` – “${fb.comment}”` : ""}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
const styles = {
  page: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "1.5rem",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  noWorkoutsText: {
    fontSize: "1rem",
    color: "#666",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1rem",
  },
  card: {
    borderRadius: "12px",
    border: "1px solid #ddd",
    padding: "1rem",
    backgroundColor: "#fff",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
  },
  cardSelected: {
    borderColor: "#2563eb",
    boxShadow: "0 0 0 2px rgba(37,99,235,0.25)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
  },
  workoutName: {
    fontWeight: 600,
    marginBottom: "0.2rem",
  },
  workoutMeta: {
    fontSize: "0.85rem",
    color: "#555",
  },
  statusBadge: {
    padding: "0.25rem 0.6rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  detailsSection: {
    marginTop: "0.75rem",
    borderTop: "1px solid #eee",
    paddingTop: "0.75rem",
  },
  detailsTitle: {
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "0.75rem",
    fontSize: "0.85rem",
  },
  th: {
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    padding: "0.4rem",
  },
  td: {
    padding: "0.35rem",
    borderBottom: "1px solid #f2f2f2",
  },
  noExercisesText: {
    fontSize: "0.85rem",
    color: "#666",
  },
  feedbackSection: {
    marginTop: "0.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  feedbackTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
  },
  select: {
    padding: "0.4rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.85rem",
  },
  commentLabel: {
    fontSize: "0.85rem",
    fontWeight: 500,
  },
  textarea: {
    minHeight: "60px",
    padding: "0.4rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.85rem",
    resize: "vertical",
  },
  saveButton: {
    alignSelf: "flex-start",
    marginTop: "0.25rem",
    padding: "0.4rem 0.8rem",
    borderRadius: "999px",
    border: "none",
    fontSize: "0.85rem",
    fontWeight: 600,
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  savedText: {
    fontSize: "0.8rem",
    color: "#444",
  },
};

function statusStyle(status) {
  if (status === "Completed") {
    return { backgroundColor: "#dcfce7", color: "#166534" };
  }
  if (status === "Missed") {
    return { backgroundColor: "#fee2e2", color: "#991b1b" };
  }
  if (status === "Partial") {
    return { backgroundColor: "#fef9c3", color: "#854d0e" };
  }
  return {};
}

export default WorkoutHistory;
