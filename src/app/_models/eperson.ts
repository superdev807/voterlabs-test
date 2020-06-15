import { Person } from './person';
export class EnhancedPerson {
  person: Person;
  verified_address: boolean;
  verified_voter: boolean;
  verified_identity: boolean;
  name_bucket: Array<string>;
  matrix_name: string;
  exact_name_matrix_match: boolean;
  match_exact_name_matrix_match: boolean;
  name_matrix_cluster_match: boolean;
  match_name_matrix_cluster_match: boolean;
}
