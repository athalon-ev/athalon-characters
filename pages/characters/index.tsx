import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getCharacters from "app/characters/queries/getCharacters";

const ITEMS_PER_PAGE = 100;

export const CharactersList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ characters, hasMore }] = usePaginatedQuery(getCharacters, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <Link
              href={Routes.ShowCharacterPage({ characterId: character.id })}
            >
              <a>{character.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const CharactersPage = () => {
  return (
    <Layout>
      <Head>
        <title>Characters</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCharacterPage()}>
            <a>Create Character</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CharactersList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default CharactersPage;
