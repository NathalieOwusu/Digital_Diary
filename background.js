chrome.runtime.onInstalled.addListener(() => {
  if (reason !== "install") {
    return;
  }
  // create an alarm so we have something to look at in the demo
  chrome.alarms.create("demo-default-alarm", {
    delyInMintues: 1,
    periodInMinutes: 1,
  });
});
