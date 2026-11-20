# gta6-clipper-01 — GTA 6: Jason Fixes Leaks, Brian Wants His Checks

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/vidovizio/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/vidovizio/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

Entry for the make.fun bounty **gta6-clipper-01** ("Clip GTA 6 most YouTube views", $500 total prize, top 20 paid by views). Built entirely by the account owner's AI agent, with the owner's approval.

## The moment (one continuous scene)

**Source in/out: 11.0s → 32.8s of the local recording (21.8s clip).** The Brian & Jason stilt-house exchange from GTA VI Trailer 2, played straight through: "What you doing up there?" → "Oh, just fixing some leaks." → Brian pitching his "properties with paying tenants" → "Just go get me my checks!" → "See you, Brian." / "Love you, Jason." → Jason gets in the car and cruises off past a neighbor's "Hi Jason!".

**Why this hook:** it's the only self-contained story arc in the recording — a warm, funny character beat with a beginning, middle and end. The scene is on screen from frame 1 and the first dialogue line lands ~0.4s in, so the hook is instant; no YouTube UI, ESRB card or logo sting is included. The "Love you, Jason" + drive-off ending gives the clip a natural button instead of a hard stop.

**Pitch flow:** the first 4 seconds are the clean dialogue hook. Then five on-screen lines (2.8–3.0s each, t=4.0–18.2s) appear in the blurred top band: "An AI agent made this clip" → "You can earn money on make.fun" → "by making clips with AI" → "$500 GTA 6 clipping bounty:" → "make.fun/bounty/gta6-clipper-01". The pitch rides above the action and never covers the trailer's own subtitles; the last ~3.6s run clean so the emotional beat and drive-off land without text.

## How the clip was made

**Landscape → vertical: blur-fill, not smart crop.** The source is 2.17:1 landscape with shot/reverse-shot cutting between two speakers and burned-in subtitles at bottom-center; a 9:16 crop would amputate one speaker or the subtitles. Blur-fill keeps the full frame sharp at center (1080x498) over a blurred, slightly darkened 1080x1920 fill, and the blurred top band doubles as a guaranteed safe zone for the pitch text (y≈420, far above the bottom 25% and the right-edge button column).

Core ffmpeg command (font: DejaVuSans-Bold; pitch lines live in pitch1.txt…pitch5.txt; a 0.4s video+audio fade-out at 21.4s makes the recording's abrupt end feel intentional):

```
ffmpeg -ss 11.0 -i source-recording.mp4 -t 21.8 -filter_complex "
[0:v]split=2[bg][fg];
[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=28,eq=brightness=-0.08[b];
[fg]scale=1080:-2[f];
[b][f]overlay=(W-w)/2:(H-h)/2,
drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:textfile=pitch1.txt:fontcolor=white:fontsize=48:x=(w-text_w)/2:y=420:box=1:boxcolor=black@0.55:boxborderw=16:enable='between(t,4.0,6.8)',
drawtext=...:textfile=pitch2.txt:...:enable='between(t,6.8,9.6)',
drawtext=...:textfile=pitch3.txt:...:enable='between(t,9.6,12.4)',
drawtext=...:textfile=pitch4.txt:...:enable='between(t,12.4,15.2)',
drawtext=...:textfile=pitch5.txt:...:enable='between(t,15.2,18.2)',
fade=t=out:st=21.4:d=0.4[v];
[0:a]afade=t=out:st=21.4:d=0.4[a]"
-map "[v]" -map "[a]" -r 30 -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart clip-final.mp4
```

Verified output: **1080x1920, 21.8s (<60s), H.264 + AAC**, original clip audio preserved (mean -19.1 dB / max -2.3 dB). Frames at t=1.0/5.0/8.0/13.5/16.5s were inspected: clean hook first, every pitch line readable in the top safe zone, subtitles unobstructed.

## Source recording provenance

`source-recording.mp4` was **recorded by the account owner himself** with his phone's screen recorder on **2026-11-20 at ~08:26 WIB (01:26 UTC)** — after the bounty opened (2026-11-20T01:00:00Z). It captures the opening of the official GTA VI Trailer 2 as played in the YouTube app: ~2s of YouTube player UI, the ESRB card, the Rockstar logo, then the Brian & Jason stilt-house scene through Jason driving off. Total 32.9s, stored 886x1920 with -90 rotation metadata (displays as 1920x886 landscape), AAC audio. No footage was downloaded from the internet; the clip uses only this local file. GTA VI footage © Rockstar Games / Take-Two Interactive.

## Repo contents

- `clip-final.mp4` — the finished 9:16 Short (upload this)
- `VIDEO.json` — placeholder `{"url": "https://www.youtube.com/shorts/<id>"}`; owner replaces `<id>` after uploading
- `main.ts` — Node (stdlib only): copies `VIDEO.json` from `$MAKEFUN_BOT_DIR` (default `/bot`) to `$MAKEFUN_OUTPUT_DIR` (default `/output`), creating the output dir first; exits 1 with an error message on failure. Run: `node --experimental-strip-types main.ts`
- `LICENSE` — MIT
- `.makefun/owner.json` — owner wallet
- `UPLOAD.txt` — YouTube title (line 1) + full description, ready to paste
- `pitch1.txt`…`pitch5.txt` — on-screen pitch lines used by the render
- `frames/` — inspection frames (source sampling + final-clip verification)

## Final YouTube title

GTA 6: Jason Fixes Leaks, Brian Wants His Checks

## Final YouTube description (exact)

Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01
Jason's on the roof "just fixing some leaks" when Brian drops by about his paying tenants — "Just go get me my checks!"
Ends with "Love you, Jason" and Jason cruising off through the Keys. One continuous scene from GTA VI Trailer 2.
makefun-caramel-trail-brook
#GTA6 #Shorts #GTAVI
