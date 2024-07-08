export const handleSubmit = (form: HTMLFormElement): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        resolve(
          new Response(xhr.responseText, { status: 200, statusText: "OK" })
        );
      } else {
        reject(
          new Response(xhr.responseText, {
            status: xhr.status,
            statusText: xhr.statusText,
          })
        );
      }
    };
    xhr.send(formData);
  });
};
