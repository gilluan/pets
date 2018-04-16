import React from 'react'
import { Mutation } from 'react-apollo';
import { Modal } from 'semantic-ui-react';
import { gql } from 'apollo-boost'
import  PetForm  from './PetForm';

const SAVE_PET = gql`
mutation createEditPet(
  $id: ID
  $nome: String!,
  $especie: String,
  $cor: String,
  $raca: String,
  $sexo: String,
  $peso: Float,
  $nascimento: String,
  $criado: String,
  $ativo: Boolean,
  $comportamento: [String],
  $observacoes: String,
  $usuario: ID!
) {
  createEditPet(id: $id, nome: $nome, especie: $especie, cor: $cor, raca: $raca,
    sexo: $sexo, peso: $peso, nascimento: $nascimento, criado: $criado, ativo: $ativo,
   comportamento: $comportamento, observacoes: $observacoes, usuario: $usuario) {
      nome
    }
}
`;

const redirectPets = (user, history) => history.push(`/user/${user.id}/pets`);

const PetModalForm = ({open, size, onClose, user, history, pet}) => (

     <Mutation
      mutation={SAVE_PET}
      update={() => redirectPets(user, history)}
     >
          {(createEditPet => (
            <Modal size='small' open={open} onClose={onClose}>
               <PetForm createEditPet={createEditPet} user={user} pet={pet} />
            </Modal>
          ))}

      </Mutation>
);

export { PetModalForm };
