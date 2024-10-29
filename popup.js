// Fetch and display an affirmation quote without try-catch
function fetchAffirmation() {
    fetch("https://www.affirmations.dev/")
        .then(response => response.json())
        .then(data => {
            document.getElementById("quote").textContent = data.affirmation;
        })
        .catch(error => {
            document.getElementById("quote").textContent = "Could not load affirmation.";
            console.error("Error fetching affirmation:", error);
        });
}

// Save today's mood with date and time to Chrome storage
document.getElementById("saveMood").addEventListener("click", () => {
    const mood = document.getElementById("mood").value;
    const timestamp = new Date().toLocaleString();

    // Retrieve the current mood history array
    chrome.storage.sync.get("moodHistory", (data) => {
        const moodHistory = data.moodHistory || []; // Initialize to empty array if undefined
        moodHistory.push({ mood, timestamp }); // Append the new entry

        // Save updated moodHistory back to storage
        chrome.storage.sync.set({ moodHistory }, () => {
            alert(`Mood saved: ${mood}`);
        });
    });
});

// View mood history
document.getElementById("viewHistory").addEventListener("click", () => {
    chrome.storage.sync.get("moodHistory", (data) => {
        const moodHistory = data.moodHistory || [];
        const historyList = document.getElementById("historyList");
        historyList.innerHTML = ''; // Clear previous list

        if (moodHistory.length === 0) {
            historyList.innerHTML = "<li>No moods saved yet.</li>";
        } else {
            moodHistory.forEach(entry => {
                const listItem = document.createElement("li");
                listItem.textContent = `${entry.timestamp}: ${entry.mood}`;
                historyList.appendChild(listItem);
            });
        }

        // Toggle visibility of mood history
        document.getElementById("moodHistory").classList.toggle("hidden");
    });
});
// Clear Mood History
document.getElementById("clearHistory").addEventListener("click", ()=> {
    chrome.storage.sync.remove("moodHistory", ()=>{
        const historyList = document.getElementById("historyList");
        historyList.innerHTML = "<li> No moods saved yet! </li>"
        alert("Mood history cleared");
    })
})
// Initialize features when popup opens
document.addEventListener("DOMContentLoaded", () => {
    fetchAffirmation();






    
});
