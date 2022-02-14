interface Client {
  id: string;
  name: string;
  cnpj: string;
  address?: string;
  emails?: string[];
  data: string;
}
export default Client;
