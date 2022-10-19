import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getCharacter from "app/characters/queries/getCharacter";
import updateCharacter from "app/characters/mutations/updateCharacter";
import {
  CharacterForm,
  FORM_ERROR,
} from "app/characters/components/CharacterForm";

export const EditCharacter = () => {
  const router = useRouter();
  const characterId = useParam("characterId", "number");
  const [character, { setQueryData }] = useQuery(
    getCharacter,
    { id: characterId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateCharacterMutation] = useMutation(updateCharacter);

  return (
    <>
      <Head>
        <title>Edit Character {character.id}</title>
      </Head>

      <div>
        <h1>Edit Character {character.id}</h1>
        <pre>{JSON.stringify(character, null, 2)}</pre>

        <CharacterForm
          submitText="Update Character"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCharacter}
          initialValues={character}
          onSubmit={async (values) => {
            try {
              const updated = await updateCharacterMutation({
                id: character.id,
                ...values,
              });
              await setQueryData(updated);
              await router.push(
                Routes.ShowCharacterPage({ characterId: updated.id })
              );
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditCharacterPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCharacter />
      </Suspense>

      <p>
        <Link href={Routes.CharactersPage()}>
          <a>Characters</a>
        </Link>
      </p>
    </div>
  );
};

EditCharacterPage.authenticate = true;
EditCharacterPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditCharacterPage;
