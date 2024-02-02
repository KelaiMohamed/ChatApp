package ma.fstt.backend.Contact;

import lombok.RequiredArgsConstructor;
import ma.fstt.backend.RestController.ContactController;
import ma.fstt.backend.StringEncryptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactServiceImp implements ContactService{

    private final StringEncryptionService EncryptionService;
    private final ContactRepository contactRepository;

    @Value("${encryption.secretKey}")
    private String secretKey;

    @Override
    public Contact save(Contact contact) throws Exception {
        // remembering the name and the phone number before encryption

        String Name = contact.getName();
        String username = contact.getUsername();

        // saving
        contact.setName(EncryptionService.encrypt(contact.getName(), secretKey));
        contact.setUsername(EncryptionService.encrypt(contact.getUsername(), secretKey));
        contactRepository.save(contact);

        // returning the contact
        contact.setName(Name);
        contact.setUsername(username);

        return contact;
    }



    @Override
    public Contact update(Contact contact) throws Exception {

        // remembering the name and the phone number before encryption
        String Name = contact.getName();
        String username = contact.getUsername();

        // saving
        contact.setName(EncryptionService.encrypt(contact.getName(), secretKey));
        contact.setUsername(EncryptionService.encrypt(contact.getUsername(), secretKey));
        contactRepository.save(contact);

        // returning the contact
        contact.setName(Name);
        contact.setUsername(username);

        return contact;
    }

    @Override
    public void delete(Long id) throws Exception {
        contactRepository.delete(contactRepository.findById(id).get());
    }

    @Override
    public Contact getOne(Long id) throws Exception {

        Contact contact = contactRepository.findById(id).get();

        contact.setName(EncryptionService.decrypt(contact.getName(), secretKey));
        contact.setUsername(EncryptionService.decrypt(contact.getUsername(), secretKey));

        return  contact;
    }

    @Override
    public boolean existsById(Long id) {
        return contactRepository.existsById(id);
    }

    @Override
    public List<Contact> getAllByUser(Long user_id) throws Exception {

        List<Contact> list = contactRepository.getAllByUser(user_id);
        for(Contact contact : list){
            contact.setName(EncryptionService.decrypt(contact.getName(), secretKey));
            contact.setUsername(EncryptionService.decrypt(contact.getUsername(), secretKey));
        }
        return list;
    }

}
