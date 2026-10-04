# Portfolio resumes

The portfolio offers two separate PDF downloads:

- [AI/ML resume source](Geoffrey_Lazer_AI_ML_Resume.tex) and [PDF](../public/resumes/Geoffrey_Lazer_AI_ML_Resume.pdf)
- [Unity/XR resume source](Geoffrey_Lazer_XR_Resume.tex) and [PDF](../public/resumes/Geoffrey_Lazer_XR_Resume.pdf)

Each source is a standalone Overleaf document using the supplied 10-point article
layout with 0.51-inch margins. Upload either source as `main.tex` in Overleaf.
Descriptions use concise STAR wording and retain the limits of reported results.
XpertVR is described as current role scope; its future validation targets are not
presented as achievements.

To regenerate the downloadable PDFs with Tectonic:

```sh
tectonic --outdir public/resumes resumes/Geoffrey_Lazer_AI_ML_Resume.tex
tectonic --outdir public/resumes resumes/Geoffrey_Lazer_XR_Resume.tex
cp public/resumes/Geoffrey_Lazer_AI_ML_Resume.pdf public/resume.pdf
```

The existing `/resume.pdf` URL remains an alias of the AI/ML version for older
links. Both resume options appear in the contact panel on all portfolio routes.
The website uses `publicAsset` so these downloads also work under the GitHub Pages
deployment prefix.
