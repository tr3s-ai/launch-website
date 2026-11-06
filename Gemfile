source "https://rubygems.org"

# Jekyll 4 builds both locally and in CI (any modern Ruby). The site deploys
# to GitHub Pages via the Actions workflow in .github/workflows/pages.yml
# (Settings → Pages → Source: GitHub Actions), which avoids the legacy
# `github-pages` gem's old Jekyll/Liquid pin.
gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-sitemap", "~> 1.4"
end

# Tooling gems no longer bundled with newer Rubies.
gem "webrick", "~> 1.8"
gem "csv"
gem "base64"
gem "logger"
gem "bigdecimal"
