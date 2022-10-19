import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createCharacter from "app/characters/mutations/createCharacter";
import {
  CharacterForm,
  FORM_ERROR,
} from "app/characters/components/CharacterForm";

const NewCharacterPage = () => {
  const router = useRouter();
  const [createCharacterMutation] = useMutation(createCharacter);

  return (
    <Layout title={"Create New Character"}>
      <h1>Create New Character</h1>

      <CharacterForm
        submitText="Create Character"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCharacter}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const character = await createCharacterMutation(values);
            await router.push(
              Routes.ShowCharacterPage({ characterId: character.id })
            );
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.CharactersPage()}>
          <a>Characters</a>
        </Link>
      </p>
    </Layout>
  );
};

NewCharacterPage.authenticate = true;

export default NewCharacterPage;
