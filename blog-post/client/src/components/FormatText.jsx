const FormattedContent = ({ htmlContent }) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

  export default FormattedContent;