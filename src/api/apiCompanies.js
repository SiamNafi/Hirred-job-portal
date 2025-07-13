import supabaseClient, { supabaseUrl } from "../utils/supabase";
// fetch and get all companies
export async function getCompanies(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("companies").select("*");
  if (error) {
    console.log("error fetching companies", error);
    return null;
  }
  return data;
}

// upload a companies
export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);
  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;
  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);
  console.log(companyData);
  if (storageError) {
    console.log("error creating company companies", storageError);
    return null;
  }
  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;
  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url,
      },
    ])
    .select();
  if (error) {
    console.log("Error submitting company ", error);
    return null;
  }
  return data;
}
