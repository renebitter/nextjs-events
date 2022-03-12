## Next.js Events Webpage

Online at: [http://localhost:3000](http://localhost:3000).

Webpage description/features:

- Featured events
- Email newsletter registration
- List of all events
- Filter all events by date
- Event detail page
- Show comments
- Submit comments

## Concepts and tech used:

- React
  - Hooks (`useEffect`, `useState`, `useRef`)
  - Client-side data fetching
- CSS modules
- Next.js

  - `getStaticProps`
  - `getStaticPaths`
  - `getServerSideProps`
  - Routing `next/link` & `next/router` - e.g. `<Link href='/'>`, `router.push()`, `router.query()`
  - Image optimization with `next/image`
  - Head
  - API Routes (`dynamic`, `async` / `await`, `error handling`)

- Mongodb (for comments & newsletter)
- Firebase (for events info)
- JSON
- REST API with fetch

## TODO:

- Add form submit frontend feedback for:

  - [ ] Newsletter email registration
  - [ ] Submit comment
  - [ ] Verify if examples from "api/feedback" are equivalent to "api/comments" and "api/newsletter" then delete it (pre-render & dynamic route ?)
  - [ ] Rename repo
  - [ ] Deploy & update README link to page
