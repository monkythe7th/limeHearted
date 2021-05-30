const staticLimeHearted = "LimeHearted-v1";
const assets = [
	"/",
	"/index.html",
	"/assets/css/style.css",
	"/assets/js/scripts.js",
	"/assets/imgs/Limehearted_logo.png",
	"/assets/imgs/LimeHearted_logo.jpg",
	"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
]

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open(staticLimeHearted).then(cache => {
			cache.addAll(assets)
		}))
})

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request)
		}))
})

