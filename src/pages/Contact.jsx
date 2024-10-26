import React from "react";
import ContactTable from "../features/contact/ContactTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Contact = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Ý kiến khách hàng</Heading>
      </Row>

      <ContactTable />
    </>
  );
};

export default Contact;
