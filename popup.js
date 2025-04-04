document.getElementById("summarizeBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractAndSendText
      });
    });
  });
  
  function extractAndSendText() {
    const paragraphs = Array.from(document.querySelectorAll("p"));
    const text = paragraphs.map(p => p.innerText).join(" ");
    fetch("http://localhost:8000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text.slice(0, 3000) }) // limit size
    })
      .then(res => res.json())
      .then(data => alert("Summary:\n" + data.summary));
  }
  