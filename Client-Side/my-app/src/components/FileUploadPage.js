import React, {useState} from 'react';

function FileUploadPage(){
    
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    
    var  frontDesign = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener(
          "load",
          () => {
            
            const url = reader.result;
            console.log( file);
          },
          false
        );
      };
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
    console.log(selectedFile)
	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);
       
        console.log(window.location.href);

		fetch(
			"127.0.0.1:8000",
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
                console.log(result)
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
            
	};
	

	return(
   <div>
			<input type="file" name="file" onChange={frontDesign} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
};export default FileUploadPage