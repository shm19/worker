# Encoder

## This project uses ffmpeg to encode videos to h265

it uses worker threads to encode multiple videos at once and not block server from handling other requests

---

## How to use

1. clone the repo
2. create input and output folders in the root of the project
3. run docker compose up

it will start the server on port 3000

---

input folder is where you put the videos you want to encode

output folder is where the encoded videos will be saved

---

## API

encode video

```bash
curl --request GET \
  --url 'http://localhost:3000/compress?fileName=video.mp4'
```

test other endpoint

```bash
curl --request GET \
 --url 'http://localhost:3000/test'
```
