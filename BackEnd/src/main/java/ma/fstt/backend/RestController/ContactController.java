package ma.fstt.backend.RestController;


import lombok.RequiredArgsConstructor;

import ma.fstt.backend.Contact.Contact;
import ma.fstt.backend.Contact.ContactService;
import ma.fstt.backend.User.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {


    private final ContactService contactService;


    @GetMapping()
    public List<ContactResponse> getAllByUser() throws Exception {

        // Retrieve the authenticated user's ID
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long authenticatedUserId = ((User) authentication.getPrincipal()).getId();

        List<ContactResponse> list = new ArrayList<>();
        List<Contact> contacts = contactService.getAllByUser(authenticatedUserId);
        for(Contact c : contacts){
            list.add(new ContactResponse(c.getId(), c.getName(), c.getUsername()));
        }

        return list;
    }

    @GetMapping("/{id}")
    public ContactResponse getOne(@PathVariable Long id) throws Exception {

        // Retrieve the authenticated user's ID
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long authenticatedUserId = ((User) authentication.getPrincipal()).getId();

        Contact contact;

        if (contactService.existsById(id)) {

            contact = contactService.getOne(id);

            if(Objects.equals(authenticatedUserId, contact.getUser().getId())){

                return new ContactResponse(contact.getId(), contact.getName(), contact.getUsername());

            }


        }

        return null;
    }


    @PostMapping
    public void createContact(@RequestBody CreateContactRequest request) throws Exception {

        // Retrieve the authenticated user's ID
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = ((User) authentication.getPrincipal());

        Contact contact = new Contact();
        contact.setName(request.getName());
        contact.setUsername(request.getUsername());
        contact.setUser(user);

        contactService.save(contact);

    }

    @PutMapping("/{id}")
    public void updateContact(@RequestBody CreateContactRequest request, @PathVariable Long id) throws Exception {

        // Retrieve the authenticated user's ID
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = ((User) authentication.getPrincipal());

        Contact contact;

        if (contactService.existsById(id)) {

            contact = contactService.getOne(id);

            if(Objects.equals(user.getId(), contact.getUser().getId())){

                contact.setName(request.getName());
                contact.setUsername(request.getUsername());
                contactService.save(contact);

            }

        }

    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Long id) throws Exception {

        // Retrieve the authenticated user's ID
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = ((User) authentication.getPrincipal());

        if (contactService.existsById(id)) {

            Contact contact = contactService.getOne(id);
            if(Objects.equals(contact.getUser().getId(), user.getId())){
                contactService.delete(id);
            }

        }
    }

}
