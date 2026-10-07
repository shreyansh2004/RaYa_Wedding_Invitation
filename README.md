# Riya & Rahul Wedding Invitation

## Free hosting on GitHub Pages

This project exports to static files and deploys to GitHub Pages whenever code
is pushed to the `main` branch.

1. Install [GitHub Desktop](https://desktop.github.com/) if Git is not installed
   on your computer, then sign in to GitHub.
2. In GitHub Desktop, choose **File → Add Local Repository** and select this
   project folder. If prompted that it is not a repository yet, choose the
   option to create a repository here.
3. Publish the repository to GitHub. A public repository can use GitHub Pages
   for free on GitHub Free.
4. On GitHub, open the repository’s **Settings → Pages** and set **Build and
   deployment → Source** to **GitHub Actions**.
5. In GitHub Desktop, commit and push the project to the `main` branch. The
   workflow in `.github/workflows/deploy.yml` builds and publishes the website.
   Later pushes to `main` automatically deploy updates.
6. Open the repository’s **Actions** tab and wait for “Deploy wedding invitation
   to GitHub Pages” to finish. GitHub will show the public website URL in the
   deployment details and under **Settings → Pages**.

For a project repository, the site URL is usually
`https://<your-github-name>.github.io/<repository-name>/`. A repository named
`<your-github-name>.github.io` is published at `https://<your-github-name>.github.io/`.
The build detects the repository name and configures the matching URL prefix
automatically.

To publish future changes, commit them in GitHub Desktop and push to `main`.
The GitHub Actions workflow redeploys the site; allow a minute or two for the
updated page to appear.

## Local development

```sh
npm ci
npm run dev
```

To check a production static export locally:

```sh
npm run build
```

The exported website is written to `out/`.
